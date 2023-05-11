import { TaskInterface } from "../lib/interfaces/task.interface"
import { APIService } from "./api-service"

export class TasksService extends APIService {
  async readTasks(): Promise<TaskInterface[]> {
    return (await this.methodGET(`/task/_id`)) as TaskInterface[]
  }

  async addTask(task: TaskInterface): Promise<TaskInterface> {
    return (await this.methodPOST(`/task/${task._id}`, task)) as TaskInterface
  }

  async updateTask(task: TaskInterface): Promise<TaskInterface> {
    return (await this.methodPUT(`/task/${task._id}`, task)) as TaskInterface
  }

  async deleteTask(task: TaskInterface): Promise<TaskInterface> {
    return (await this.methodDELETE(`/task/${task._id}`, task)) as TaskInterface
  }
}
