import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { EmailTokenInterface } from "./email.token.interface"

@Injectable()
export class EmailTokenService {
  constructor(
    @InjectModel("EmailToken")
    private readonly confirmationTokenModel: Model<EmailTokenInterface>
  ) {}

  async getEmailToken(token: string): Promise<EmailTokenInterface> {
    return await this.confirmationTokenModel.findOne({ token: token })
  }

  async createEmailToken(
    token: EmailTokenInterface
  ): Promise<EmailTokenInterface> {
    const newConfirmationToken = new this.confirmationTokenModel(token)
    return await newConfirmationToken.save()
  }

  async deleteEmailToken(tokenId: string): Promise<unknown> {
    return await this.confirmationTokenModel.deleteOne({ _id: tokenId })
  }
}
