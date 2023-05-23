import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { UserInterface } from "./user.interface"

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel: Model<UserInterface>) {}

  async getAllUsers(): Promise<UserInterface[]> {
    return await this.userModel.find().exec()
  }

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