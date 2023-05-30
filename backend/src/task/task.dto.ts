import { ApiProperty } from "@nestjs/swagger"

export class TaskDTO {
  @ApiProperty()
  readonly listId: string

  @ApiProperty()
  readonly title: string

  @ApiProperty()
  readonly createdAt: Date

  @ApiProperty()
  readonly finished: boolean

  @ApiProperty()
  readonly finishedAt: Date | null
}
