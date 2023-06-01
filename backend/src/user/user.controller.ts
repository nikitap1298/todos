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
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common"
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

  @UseGuards(AuthGuard)
  @Put("/:id")
  @ApiResponse({ status: 200, description: "User to PUT", type: UserDTO })
  @ApiResponse({ status: 401, description: "You are not authorized to PUT", type: UserDTO })
  @ApiResponse({ status: 404, description: "User not found", type: UserDTO })
  async verifyUser(
    @Param("id") id: string,
    @Body() update: Partial<UserInterface>,
    @Request() req: RequestWithUser
  ): Promise<unknown> {
    const user = await this.userService.getUserById(id)
    if (user.id !== req.user.userId) {
      throw new UnauthorizedException()
    }
    if (user.id !== id) {
      throw new NotFoundException()
    }
    return await this.userService.verifyUser(id, update)
  }
}
