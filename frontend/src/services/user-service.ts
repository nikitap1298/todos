import { UserInterface } from "../lib/interfaces/user.interface"
import { APIService } from "./api-service"

export class UserService extends APIService {
  async checkUserAccess(user: UserInterface): Promise<unknown> {
    return await this.methodPOST(`/auth/login`, user)
  }

  async readUser(): Promise<UserInterface> {
    return (await this.methodGET(`/user`)) as UserInterface
  }

  async registerUser(user: UserInterface): Promise<UserInterface> {
    return (await this.methodPOST(`/user/${user._id}`, user)) as UserInterface
  }

  async verifyUser(userId: string): Promise<unknown> {
    return await this.methodPUT(`/user/${userId}`, { userId })
  }
}
