import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common"
import { TaskService } from "../services/task.service"
import { Task } from "../lib/interfaces/task.interface"

@Controller("task/:taskId")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks()
  }

  @Post()
  async createTask(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task)
  }

  @Put()
  async updateTask(@Param("taskId") taskId: string, @Body() update: Partial<Task>): Promise<any> {
    return this.taskService.updateTask(taskId, update)
  }

  @Delete()
  async deleteTask(@Param("taskId") taskId: string): Promise<any> {
    return this.taskService.deleteTask(taskId)
  }
}
