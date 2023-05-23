import { Controller, Get, Post, Body } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserInterface } from "./user.interface"

@Controller("user/:userId")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserInterface[]> {
    return await this.userService.getAllUsers()
  }

  @Post()
  async createUser(@Body() user: UserInterface): Promise<UserInterface> {
    return await this.userService.createUser(user)
  }
}
