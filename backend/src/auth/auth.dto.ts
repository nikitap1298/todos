import { ApiProperty } from "@nestjs/swagger"

export class AuthDTO {
  @ApiProperty()
  readonly access_token: string

  @ApiProperty()
  readonly verified: boolean
}
