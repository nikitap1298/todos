import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { UserInterface } from "./user.interface"
import { MailService } from "../mail/mail.service"

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<UserInterface>,
    private mailService: MailService
  ) {}

  async getUserById(id: string): Promise<UserInterface> {
    return await this.userModel.findOne({ _id: id }).exec()
  }

  async getUser(login: string): Promise<UserInterface> {
    const user = await this.userModel.findOne({ login }).exec()
    return user
  }

  async registerUser(user: UserInterface): Promise<UserInterface> {
    const newUser = new this.userModel(user)
    await this.mailService.sendUserConfirmation(newUser, newUser.id)
    return await newUser.save()
  }

  async verifyUser(userId: string): Promise<unknown> {
    return await this.userModel.updateOne({ _id: userId }, { $set: { verified: true } })
  }
}

// For test JWT token
// This should be a real class/interface representing a user entity
// export type User = any

// @Injectable()
// export class UserService {
//   private readonly users = [
//     {
//       userId: 1,
//       login: "john",
//       password: "changeme",
//     },
//     {
//       userId: 2,
//       login: "maria",
//       password: "guess",
//     },
//   ]

//   async findUser(login: string): Promise<User | undefined> {
//     return this.users.find((user) => user.login === login)
//   }
// }
