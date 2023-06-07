import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ListModule } from "./list/list.module"
import { TaskModule } from "./task/task.module"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { MailModule } from "./mail/mail.module"
import { EmailTokenModule } from './email.token/email.token.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB),
    AuthModule,
    UserModule,
    ListModule,
    TaskModule,
    MailModule,
    EmailTokenModule,
  ],
})
export class AppModule {}
