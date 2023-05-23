import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common"
import { AuthService } from "./auth.service"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // If user is authenticated then signIn return JWT token
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.login, signInDto.password)
  }
}
