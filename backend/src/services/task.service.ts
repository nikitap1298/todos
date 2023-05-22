import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Task } from "../lib/interfaces/task.interface"

@Injectable()
export class TaskService {
  constructor(@InjectModel("Task") private readonly taskModel: Model<Task>) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel.find().exec()
  }

  async createTask(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task)
    return await newTask.save()
  }

  async updateTask(taskId: string, update: Partial<Task>): Promise<any> {
    return await this.taskModel.updateOne({ _id: taskId }, update)
  }

  async deleteTask(taskId: string): Promise<any> {
    return await this.taskModel.deleteOne({ _id: taskId })
  }
}
