export interface TaskInterface {
  _id?: string
  list?: string
  title: string
  createdAt: Date
  finished: boolean
  finishedAt?: Date
}
