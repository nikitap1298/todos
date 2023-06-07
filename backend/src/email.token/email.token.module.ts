import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { EmailTokenService } from "./email.token.service"
import { EmailTokenSchema } from "./email.token.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "EmailToken", schema: EmailTokenSchema }]),
  ],
  providers: [EmailTokenService],
})
export class EmailTokenModule {}
