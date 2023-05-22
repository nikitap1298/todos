import { Document } from "mongoose"

export interface TaskInterface extends Document {
  listId: string
  title: string
  createdAt: Date
  finished: boolean
  finishedAt: Date | null
}

