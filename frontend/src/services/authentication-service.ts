import { UserInterface } from "../lib/interfaces/user.interface"
import { APIService } from "./api-service"

export class AuthenticationService extends APIService {
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
