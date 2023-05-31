import { Document } from "mongoose"

export interface TaskInterface extends Document {
  userId: string
  listId: string
  title: string
  createdAt: Date
  finished: boolean
  finishedAt: Date | null
}
