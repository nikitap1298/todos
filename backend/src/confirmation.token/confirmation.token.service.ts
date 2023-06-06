import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { ConfirmationTokenInterface } from "./confirmation.token.interface"

@Injectable()
export class ConfirmationTokenService {
  constructor(
    @InjectModel("ConfirmationToken")
    private readonly confirmationTokenModel: Model<ConfirmationTokenInterface>
  ) {}

  async getConfirmationToken(token: string): Promise<ConfirmationTokenInterface> {
    return await this.confirmationTokenModel.findOne({ token: token })
  }

  async createConfirmationToken(
    token: ConfirmationTokenInterface
  ): Promise<ConfirmationTokenInterface> {
    const newConfirmationToken = new this.confirmationTokenModel(token)
    return await newConfirmationToken.save()
  }
}
