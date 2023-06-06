import { MailerService } from "@nestjs-modules/mailer"
import { Injectable } from "@nestjs/common"
import { UserInterface } from "../user/user.interface"
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserInterface, idAndToken: string) {
    const url = `${process.env.CONFIRMATION_URL}${idAndToken}`

    await this.mailerService.sendMail({
      to: user.login,
      subject: "Welcome to Todos! Confirm your Email",
      template: "./confirmation",
      context: {
        name: user.login,
        url,
      },
    })
  }
}
