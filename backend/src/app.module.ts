import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ListModule } from "./list/list.module"
import { TaskModule } from "./task/task.module"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { MailModule } from "./mail/mail.module"
import { ConfirmationTokenModule } from './confirmation.token/confirmation.token.module';
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
    ConfirmationTokenModule,
  ],
})
export class AppModule {}
