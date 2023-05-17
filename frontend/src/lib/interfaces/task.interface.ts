export interface TaskInterface {
  _id?: string
  listId?: string
  title: string
  createdAt: Date
  finished: boolean
  finishedAt?: Date
}
