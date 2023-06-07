/* eslint-disable @typescript-eslint/no-this-alias */
import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { UserService } from "./user.service"
import { UserSchema } from "./user.schema"
import { UserController } from "./user.controller"
import { ListSchema } from "../list/list.schema"
import { MailService } from "../mail/mail.service"
import bcrypt from "bcrypt"
import { EmailTokenService } from "../email.token/email.token.service"
import { EmailTokenSchema } from "../email.token/email.token.schema"

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: "User",
        useFactory: () => {
          const schema = UserSchema
          // Encrypt user password
          schema.pre("save", async function (next) {
            const user = this
            if (!user.isModified("password")) return next()

            try {
              const salt = await bcrypt.genSalt()
              const hash = await bcrypt.hash(user.password, salt)
              user.password = hash
              next()
            } catch (error) {
              return console.error(error)
            }
          })
          return schema
        },
      },
    ]),
    MongooseModule.forFeature([{ name: "List", schema: ListSchema }]),
    MongooseModule.forFeature([{ name: "EmailToken", schema: EmailTokenSchema }])
  ],
  providers: [UserService, MailService, EmailTokenService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
