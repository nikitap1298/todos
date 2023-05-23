import { Document } from "mongoose"

export interface UserInterface extends Document {
  login: string
  password: string
}
