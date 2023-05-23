import { UserInterface } from "../lib/interfaces/user.interface"
import { APIService } from "./api-service"

export class UserService extends APIService {
  async checkUserAccess(user: UserInterface): Promise<unknown> {
    return await this.methodPOST(`/auth/login`, user)
  }

  async readUsers(): Promise<UserInterface[]> {
    return (await this.methodGET(`/user/_id`)) as UserInterface[]
  }

  async addUser(user: UserInterface): Promise<UserInterface> {
    return (await this.methodPOST(`/user/${user._id}`, user)) as UserInterface
  }

  async deleteUser(user: UserInterface): Promise<UserInterface> {
    return (await this.methodDELETE(`user/${user._id}`, user)) as UserInterface
  }
}
