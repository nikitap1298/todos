import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { UserInterface } from "./user.interface"
import { MailService } from "../mail/mail.service"
import { v4 as uuidv4 } from "uuid"
import { EmailTokenService } from "../email.token/email.token.service"
import { EmailTokenInterface } from "../email.token/email.token.interface"

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<UserInterface>,
    private mailService: MailService,
    private emailTokenService: EmailTokenService
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
    const token = uuidv4()

    const currentTime = new Date()
    const validUntil = Math.floor((currentTime.getTime() + 72 * 60 * 60 * 1000) / 1000)
    await this.emailTokenService.createEmailToken({
      token: token,
      userId: newUser.id,
      validUntil: validUntil,
    } as EmailTokenInterface)
    await this.mailService.sendUserConfirmation(newUser, `${newUser.id}/${token}`)
    return await newUser.save()
  }

  async verifyUser(userId: string): Promise<unknown> {
    return await this.userModel.updateOne({ _id: userId }, { $set: { verified: true } })
  }

  async resetPassword(userId: string, newPassword: string): Promise<unknown> {
    return await this.userModel.updateOne({ _id: userId }, { $set: { password: newPassword } })
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
