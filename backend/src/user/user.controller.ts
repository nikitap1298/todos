import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserInterface } from "./user.interface"
import { AuthGuard } from "../auth/auth.guard"

@Controller("user/:userId")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(): Promise<UserInterface[]> {
    return await this.userService.getAllUsers()
  }

  @Post()
  async createUser(@Body() user: UserInterface): Promise<UserInterface> {
    return await this.userService.createUser(user)
  }
}
