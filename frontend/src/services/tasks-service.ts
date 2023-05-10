import { TaskInterface } from "../lib/interfaces/task.interface"
import { APIService } from "./api-service"

export class TasksService extends APIService {
  async readTasks(): Promise<TaskInterface[]> {
    return (await this.methodGET("/task")) as TaskInterface[]
  }

  async addTask(task: TaskInterface): Promise<TaskInterface> {
    return (await this.methodPOST("/task", task)) as TaskInterface
  }

  async updateTask(task: TaskInterface): Promise<TaskInterface> {
    return (await this.methodPUT("/task", task)) as TaskInterface
  }

  deleteTask = (task: TaskInterface): void => {
    this.methodDELETE("/task", task)
  }
}
