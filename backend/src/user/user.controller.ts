import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  ConflictException,
  Put,
  Param,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { AuthGuard } from "../auth/auth.guard"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { UserDTO } from "./user.dto"
import { RequestWithUser, UserInterface } from "./user.interface"
import { EmailTokenService } from "../email.token/email.token.service"
import { MailService } from "../mail/mail.service"
import { v4 as uuidv4 } from "uuid"
import { EmailTokenInterface } from "../email.token/email.token.interface"
import argon2 from "argon2"

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly confirmationTokenService: EmailTokenService,
    private readonly mailService: MailService
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: "Found user", type: UserDTO })
  @ApiResponse({ status: 401, description: "You are not authorized to GET", type: UserDTO })
  async getUser(@Request() req: RequestWithUser): Promise<UserInterface> {
    // req.user.userId comes from auth.service -> payload -> userId
    
    const user = await this.userService.getUserById(req.user.userId)

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }

  @Post("/:id")
  @ApiResponse({ status: 201, description: "User to POST", type: UserDTO })
  @ApiResponse({ status: 409, description: "Conflick during registration", type: UserDTO })
  async registerUser(@Body() user: UserInterface): Promise<UserInterface> {
    const existingUser = await this.userService.getUser(user.login)
    if (existingUser) {
      throw new ConflictException()
    }
    return await this.userService.registerUser(user)
  }

  @Put("/:id/:token")
  @ApiResponse({ status: 200, description: "User to PUT", type: UserDTO })
  @ApiResponse({ status: 401, description: "You are not authorized to PUT", type: UserDTO })
  @ApiResponse({ status: 404, description: "User not found", type: UserDTO })
  async verifyUser(@Param("id") id: string, @Param("token") token: string): Promise<unknown> {
    const tokenObject = await this.confirmationTokenService.getEmailToken(token)
    if (tokenObject.userId !== id) {
      throw new UnauthorizedException()
    }
    const user = await this.userService.getUserById(id)
    if (user.id !== id) {
      throw new NotFoundException()
    }

    const currentTime = Math.floor(new Date().getTime()) / 1000
    if (tokenObject.validUntil <= currentTime) {
      await this.confirmationTokenService.deleteEmailToken(tokenObject._id)
      throw new UnauthorizedException()
    }
    await this.confirmationTokenService.deleteEmailToken(tokenObject._id)
    return await this.userService.verifyUser(id)
  }

  @Post("/reset-password-mail/:login")
  @ApiResponse({ status: 201, description: "Send reset password mail", type: UserDTO })
  @ApiResponse({ status: 401, description: "You are not authorized to POST", type: UserDTO })
  @ApiResponse({ status: 404, description: "User not found", type: UserDTO })
  async sendResetPasswordMail(@Param("login") login: string): Promise<unknown> {
    const user = await this.userService.getUser(login)

    if (!user) {
      throw new NotFoundException()
    } else if (user.login !== login) {
      throw new UnauthorizedException()
    }

    const token = uuidv4()

    const currentTime = new Date()
    const validUntil = Math.floor((currentTime.getTime() + 1 * 60 * 60 * 1000) / 1000)

    await this.confirmationTokenService.createEmailToken({
      token: token,
      userId: user.id,
      validUntil: validUntil,
    } as EmailTokenInterface)
    await this.mailService.sendResetPassword(user, `${user.id}/${token}`)
    return { user }
  }

  @Put("/new-password")
  @ApiResponse({ status: 200, description: "User to PUT", type: UserDTO })
  @ApiResponse({ status: 401, description: "You are not authorized to PUT", type: UserDTO })
  @ApiResponse({ status: 404, description: "User not found", type: UserDTO })
  async resetPassword(
    @Body() data: { userId: string; token: string; newPassword: string }
  ): Promise<unknown> {
    const { userId, token, newPassword } = data

    const user = await this.userService.getUserById(userId)
    if (!user) {
      throw new NotFoundException()
    }

    const tokenObject = await this.confirmationTokenService.getEmailToken(token)
    const currentTime = Math.floor(new Date().getTime()) / 1000

    if (!tokenObject || tokenObject.userId !== userId) {
      throw new UnauthorizedException()
    } else if (tokenObject.validUntil <= currentTime) {
      await this.confirmationTokenService.deleteEmailToken(tokenObject._id)
      throw new UnauthorizedException()
    }

    const hash = await argon2.hash(newPassword)

    await this.confirmationTokenService.deleteEmailToken(tokenObject._id)
    return await this.userService.resetPassword(userId, hash)
  }
}
