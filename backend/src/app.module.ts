import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ListModule } from "./list/list.module"
import { TaskModule } from "./task/task.module"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/todos"),
    ListModule,
    TaskModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
