import { Document } from "mongoose"

export interface UserInterface extends Document {
  userId?: string 
  login: string
  password: string
}
