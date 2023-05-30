import { ApiProperty } from "@nestjs/swagger"

export class ListDTO {
  @ApiProperty()
  readonly userId: string

  @ApiProperty()
  readonly title: string
}
