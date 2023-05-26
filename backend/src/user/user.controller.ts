import { Controller, Get, Post, Body, UseGuards, Delete, Param, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common"
import { UserService } from "./user.service"
import { CreateUserDTO, UserDTO, UserInterface } from "./user.interface"
import { AuthGuard } from "../auth/auth.guard"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

@Controller("user")
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'The found record', type: [UserDTO] })
  @Get()
  async getAllUsers(): Promise<UserDTO[]> {
    return await this.userService.getAllUsers() as UserDTO[]
  }

  @Post()
  async createUser(@Body() user: CreateUserDTO): Promise<UserInterface> {
    return await this.userService.createUser(user)
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@Param("id") id: string): Promise<unknown> {
    return await this.userService.deleteUser(id)
  }
}
