import { Controller, Get, Post, Body, UseGuards, Request } from "@nestjs/common"
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
  async getAllUsers(@Request() req: RequestWithUser): Promise<UserInterface> {
    return await this.userService.getUserById(req.user.userId)
  }

  @Post("/:id")
  @ApiResponse({ status: 201, description: "User to POST", type: UserDTO })
  async registerUser(@Body() user: UserInterface): Promise<UserInterface> {
    return await this.userService.registerUser(user)
  }
}
