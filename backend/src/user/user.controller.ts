import { Controller, Get, Post, Body, UseGuards, Delete, Param } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserInterface } from "./user.interface"
import { AuthGuard } from "../auth/auth.guard"

@Controller("user/:id")
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

  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@Param("id") id: string): Promise<any> {
    return await this.userService.deleteUser(id)
  }
}
