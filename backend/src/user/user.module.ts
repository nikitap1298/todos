import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { UserService } from "./user.service"
import { UserSchema } from "./user.schema"
import { UserController } from "./user.controller"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "List", schema: UserSchema }]),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
