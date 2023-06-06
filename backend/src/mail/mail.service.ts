import { MailerService } from "@nestjs-modules/mailer"
import { Injectable } from "@nestjs/common"
import { UserInterface } from "../user/user.interface"

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserInterface, idAndToken: string) {
    const url = `http://localhost:3000/auth/confirm/${idAndToken}`

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
