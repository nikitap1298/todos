import { Document } from "mongoose"

export interface Task extends Document {
  listId: string
  title: string
  createdAt: Date
  finished: boolean
  finishedAt: Date | null
}
