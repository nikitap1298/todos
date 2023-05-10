export interface TaskInterface {
  title: string
  createdAt: Date
  finished: boolean
  finishedAt?: Date
}

export interface TaskContextInterface {
  tasks: TaskInterface[]
  addNewTask: (newTaskTitle: string) => void
  completeTask: (index: number) => void
  showCompletedTasks: boolean
  showOrHideCompletedTasks: () => void
  deleteCompletedTasks: () => void
}
