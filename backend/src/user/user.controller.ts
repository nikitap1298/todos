import { Controller, Get, Post, Body, UseGuards, Request, ConflictException } from "@nestjs/common"
import { UserService } from "./user.service"
import { AuthGuard } from "../auth/auth.guard"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { UserDTO } from "./user.dto"
import { RequestWithUser, UserInterface } from "./user.interface"

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: "Found users", type: [UserDTO] })
  @Get()
  async getUser(@Request() req: RequestWithUser): Promise<UserInterface> {
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
}
