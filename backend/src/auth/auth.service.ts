import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "../user/user.service"
import { JwtService } from "@nestjs/jwt"
import bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.userService.getUser(login)
    const isPasswordValid = await bcrypt.compare(pass, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException()
    } else {
      const payload = { sub: user._id, userId: user._id }
      return {
        access_token: await this.jwtService.signAsync(payload),
      }
    }
  }
}

/* 
To get access_token
curl -X POST http://localhost:8000/auth/login -d '{"login": "user1", "password": "123456"}' -H "Content-Type: application/json"
*/
