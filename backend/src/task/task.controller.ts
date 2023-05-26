import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common"
import { TaskService } from "./task.service"
import { TaskInterface } from "./task.interface"
import { AuthGuard } from "../auth/auth.guard"

@Controller("task/:id")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

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
  async updateTask(@Param("id") id: string, @Body() update: Partial<TaskInterface>): Promise<unknown> {
    return await this.taskService.updateTask(id, update)
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteTask(@Param("id") id: string): Promise<unknown> {
    return await this.taskService.deleteTask(id)
  }
}
