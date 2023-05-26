import { ApiProperty } from "@nestjs/swagger"
import { Document } from "mongoose"

export interface UserInterface extends Document {
  userId?: string
  login: string
  password: string
}

export interface RequestWithUser extends Request {
  user: UserInterface
}

// TODO: refactor into seperate file
export class CreateUserDTO {
  @ApiProperty()
  readonly login: string

  @ApiProperty()
  readonly password: string
}
export class UserDTO {
  @ApiProperty()
  readonly _id: string

  @ApiProperty()
  readonly login: string

  @ApiProperty()
  readonly password: string
}
