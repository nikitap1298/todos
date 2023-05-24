import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common"
import { TaskService } from "./task.service"
import { TaskInterface } from "./task.interface"
import { AuthGuard } from "../auth/auth.guard"

@Controller("task/:taskId")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllTasks(): Promise<TaskInterface[]> {
    return await this.taskService.getAllTasks()
  }

  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Body() task: TaskInterface): Promise<TaskInterface> {
    return await this.taskService.createTask(task)
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateTask(
    @Param("taskId") taskId: string,
    @Body() update: Partial<TaskInterface>
  ): Promise<any> {
    return await this.taskService.updateTask(taskId, update)
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteTask(@Param("taskId") taskId: string): Promise<any> {
    return await this.taskService.deleteTask(taskId)
  }
}
