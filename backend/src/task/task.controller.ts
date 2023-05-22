import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common"
import { TaskService } from "./task.service"
import { TaskInterface } from "./task.interface"

@Controller("task/:taskId")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<TaskInterface[]> {
    return await this.taskService.getAllTasks()
  }

  @Post()
  async createTask(@Body() task: TaskInterface): Promise<TaskInterface> {
    return await this.taskService.createTask(task)
  }

  @Put()
  async updateTask(
    @Param("taskId") taskId: string,
    @Body() update: Partial<TaskInterface>
  ): Promise<any> {
    return await this.taskService.updateTask(taskId, update)
  }

  @Delete()
  async deleteTask(@Param("taskId") taskId: string): Promise<any> {
    return await this.taskService.deleteTask(taskId)
  }
}
