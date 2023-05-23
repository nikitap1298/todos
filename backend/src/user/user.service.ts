import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { UserInterface } from "./user.interface"

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel: Model<UserInterface>) {}

  async findUser(login: string): Promise<UserInterface> {
    // .exec() - execute the query and return a promise
    const user = await this.userModel.findOne({ login }).exec()
    return user
  }

  async createUser(user: UserInterface): Promise<UserInterface> {
    const newUser = new this.userModel(user)
    return await newUser.save()
  }
}
