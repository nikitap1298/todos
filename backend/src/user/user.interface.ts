import { Document } from "mongoose"

export interface UserInterface extends Document {
  userId?: string
  login: string
  password: string
  verified: boolean
}

export interface RequestWithUser extends Request {
  user: UserInterface
}
