import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "../user/user.service"

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(login)
    if (user?.password != pass) {
      throw new UnauthorizedException()
    }
    const { password, ...result } = user
    /* 
    Generate a JWT and return it here
    instead of the user object\
    */
    return result
  }
}
