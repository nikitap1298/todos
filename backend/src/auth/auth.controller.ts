import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common"
import { AuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"
import { RequestWithUser } from "src/user/user.interface"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { AuthDTO } from "./auth.dto"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req: RequestWithUser) {
    return req.user.userId
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiResponse({ status: 200, description: "Found auth", type: AuthDTO })
  @ApiResponse({ status: 401, description: "You are not authorized to POST", type: AuthDTO })
  @ApiResponse({ status: 403, description: "User not verified", type: AuthDTO })
  async signIn(@Body() signInDto: Record<string, any>) {
    
    const userData = await this.authService.signIn(signInDto.login, signInDto.password)

    if (!userData.access_token) {
      throw new UnauthorizedException()
    }

    if (userData.verified !== true) {
      throw new ForbiddenException()
    }

    return userData
  }
}
