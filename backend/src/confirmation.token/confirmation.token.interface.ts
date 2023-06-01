import { Document } from "mongoose"

export interface ConfirmationTokenInterface extends Document {
  token: string
  userId: string
}
