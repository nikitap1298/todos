import { Document } from "mongoose"

export interface ListInterface extends Document {
  userId: string
  title: string
}
