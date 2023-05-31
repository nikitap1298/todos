import { TaskInterface } from "../lib/interfaces/task.interface"
import { APIService } from "./api-service"

export class TasksService extends APIService {
  async readTasks(): Promise<TaskInterface[]> {
    return (await this.methodGET(`/tasks`)) as TaskInterface[]
  }

  async addTask(listId: string, task: TaskInterface): Promise<TaskInterface> {
    return (await this.methodPOST(`/tasks/${listId}/${task._id}`, task)) as TaskInterface
  }

  async updateTask(task: TaskInterface): Promise<TaskInterface> {
    return (await this.methodPUT(`/tasks/${task._id}`, task)) as TaskInterface
  }

  async deleteTask(task: TaskInterface): Promise<TaskInterface> {
    return (await this.methodDELETE(`/tasks/${task._id}`, task)) as TaskInterface
  }
}
