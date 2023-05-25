import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { TaskInterface } from "./task.interface"

@Injectable()
export class TaskService {
  constructor(@InjectModel("Task") private readonly taskModel: Model<TaskInterface>) {}

  async getAllTasks(): Promise<TaskInterface[]> {
    return await this.taskModel.find().exec()
  }

  async createTask(task: TaskInterface): Promise<TaskInterface> {
    const newTask = new this.taskModel(task)
    return await newTask.save()
  }

  async updateTask(taskId: string, update: Partial<TaskInterface>): Promise<unknown> {
    return await this.taskModel.updateOne({ _id: taskId }, update)
  }

  async deleteTask(taskId: string): Promise<unknown> {
    return await this.taskModel.deleteOne({ _id: taskId })
  }
}
