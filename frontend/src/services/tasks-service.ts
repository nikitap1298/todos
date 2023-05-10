import { TaskInterface } from "../lib/interfaces/task.interface"
import { APIService } from "./api-service"

export class TasksService extends APIService {
  readTasks = (): Promise<TaskInterface[]> => {
    return this.methodGET("/task")
      .then((data) => {
        return data
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  async addTask(task: TaskInterface): Promise<TaskInterface> {
    return (await this.methodPOST("/task", task)) as TaskInterface
  }

  updateTask = (task: TaskInterface): void => {
    this.methodPUT("/task", task)
  }

  deleteTask = (task: TaskInterface): void => {
    this.methodDELETE("/task", task)
  }
}
