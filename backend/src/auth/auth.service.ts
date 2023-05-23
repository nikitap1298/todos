import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "../user/user.service"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(login)
    if (user?.password != pass) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.userId, login: user.login }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
