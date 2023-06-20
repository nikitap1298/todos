import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "../user/user.service"
import { JwtService } from "@nestjs/jwt"
import argon2 from "argon2"
import { AuthDTO } from "./auth.dto"

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(login: string, pass: string): Promise<AuthDTO> {
    const user = await this.userService.getUser(login)
    const isPasswordValid = await argon2.verify(user.password, pass)

    if (!isPasswordValid) {
      throw new UnauthorizedException()
    } else {
      const payload = { sub: user._id, userId: user._id }
      return {
        access_token: await this.jwtService.signAsync(payload),
        verified: user.verified,
      }
    }
  }
}

/* 
To get access_token
curl -X POST http://localhost:8000/auth/login -d '{"login": "user1", "password": "123456"}' -H "Content-Type: application/json"
*/
