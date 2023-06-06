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

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly confirmationTokenService: ConfirmationTokenService
  ) {}

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: "Found user", type: UserDTO })
  @Get()
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
}
