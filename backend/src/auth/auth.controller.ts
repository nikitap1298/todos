import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common"
import { AuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"
import { RequestWithUser } from "src/user/user.interface"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.login, signInDto.password)
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req: RequestWithUser) {
    // FIXME: return user profile form DB
    return req.user
  }
}
