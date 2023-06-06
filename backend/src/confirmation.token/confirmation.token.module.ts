import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ConfirmationTokenService } from "./confirmation.token.service"
import { ConfirmationTokenSchema } from "./confirmation.token.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "ConfirmationToken", schema: ConfirmationTokenSchema }]),
  ],
  providers: [ConfirmationTokenService],
})
export class ConfirmationTokenModule {}
