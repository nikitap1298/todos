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
import { ConfirmationTokenService } from "../confirmation.token/confirmation.token.service"
import { MailService } from "../mail/mail.service"
import { v4 as uuidv4 } from "uuid"
import { ConfirmationTokenInterface } from "../confirmation.token/confirmation.token.interface"
import bcrypt from "bcrypt"

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly confirmationTokenService: ConfirmationTokenService,
    private readonly mailService: MailService
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: "Found user", type: UserDTO })
  async getUser(@Request() req: RequestWithUser): Promise<UserInterface> {
    // req.user.userId comes from auth.service -> payload -> userId
    return await this.userService.getUserById(req.user.userId)
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
    const tokenObject = await this.confirmationTokenService.getConfirmationToken(token)
    if (tokenObject.userId !== id) {
      throw new UnauthorizedException()
    }
    const user = await this.userService.getUserById(id)
    if (user.id !== id) {
      throw new NotFoundException()
    }
    await this.confirmationTokenService.deleteConfirmationToken(tokenObject._id)
    return await this.userService.verifyUser(id)
  }

  @Post("/reset-password-mail/:login")
  @ApiResponse({ status: 201, description: "Send reset password mail", type: UserDTO })
  @ApiResponse({ status: 401, description: "You are not authorized to POST", type: UserDTO })
  @ApiResponse({ status: 404, description: "User not found", type: UserDTO })
  async sendResetPasswordMail(@Param("login") login: string): Promise<void> {
    const user = await this.userService.getUser(login)

    if (!user) {
      throw new NotFoundException()
    } else if (user.login !== login) {
      throw new UnauthorizedException()
    }

    const token = uuidv4()
    await this.confirmationTokenService.createConfirmationToken({
      token: token,
      userId: user.id,
    } as ConfirmationTokenInterface)
    await this.mailService.sendResetPassword(user, `${user.id}/${token}`)
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

    const tokenObject = await this.confirmationTokenService.getConfirmationToken(token)
    if (!tokenObject || tokenObject.userId !== userId) {
      throw new UnauthorizedException()
    }

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(newPassword, salt)

    await this.confirmationTokenService.deleteConfirmationToken(tokenObject._id)
    return await this.userService.resetPassword(userId, hash)
  }
}
