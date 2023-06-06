import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ListModule } from "./list/list.module"
import { TaskModule } from "./task/task.module"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { MailModule } from "./mail/mail.module"
import { ConfirmationTokenModule } from './confirmation.token/confirmation.token.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/todos"),
    AuthModule,
    UserModule,
    ListModule,
    TaskModule,
    MailModule,
    ConfirmationTokenModule,
  ],
})
export class AppModule {}
