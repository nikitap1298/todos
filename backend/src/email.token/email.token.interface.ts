import { Document } from "mongoose"

export interface EmailTokenInterface extends Document {
  token: string
  userId: string
  validUntil: number | null
}
