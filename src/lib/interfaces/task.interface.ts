export interface TaskInterface {
  title: string
  createdAt: string
  finished: boolean
  finishedAt: string
}

export interface TaskContextInterface {
  tasks: TaskInterface[]
  addNewTask: (newTaskTitle: string) => void
  completeTask: (index: number) => void
  showCompletedTasks: boolean
  showOrHideCompletedTasks: () => void
  deleteCompletedTasks: () => void
}
