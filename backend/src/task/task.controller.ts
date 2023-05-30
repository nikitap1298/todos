import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
} from "@nestjs/common"
import { TaskService } from "./task.service"
import { TaskInterface } from "./task.interface"
import { AuthGuard } from "../auth/auth.guard"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { TaskDTO } from "./task.dto"
import { RequestWithUser } from "src/user/user.interface"

@Controller("task")
@ApiTags("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: "Found tasks", type: [TaskDTO] })
  async getTasks(@Request() req: RequestWithUser): Promise<TaskInterface[]> {
    const userId = req.user.userId
    return await this.taskService.getTasks(userId)
  }

  @UseGuards(AuthGuard)
  @Post("/:id")
  @ApiResponse({ status: 201, description: "Task to POST", type: TaskDTO })
  async createTask(
    @Body() task: TaskInterface,
    @Request() req: RequestWithUser
  ): Promise<TaskInterface> {
    if (task.userId !== req.user.userId) {
      throw new UnauthorizedException()
    }
    return await this.taskService.createTask(task)
  }

  @UseGuards(AuthGuard)
  @Put("/:id")
  @ApiResponse({ status: 200, description: "Task to PUT", type: TaskDTO })
  async updateTask(
    @Param("id") id: string,
    @Body() update: Partial<TaskInterface>,
    @Request() req: RequestWithUser
  ): Promise<unknown> {
    const task = await this.taskService.getTask(id)
    if (task.userId.toString() !== req.user.userId) {
      throw new UnauthorizedException()
    }
    return await this.taskService.updateTask(id, update)
  }

  @UseGuards(AuthGuard)
  @Delete("/:id")
  @ApiResponse({ status: 200, description: "Task to DELETE", type: TaskDTO })
  async deleteTask(@Param("id") id: string, @Request() req: RequestWithUser): Promise<unknown> {
    const task = await this.taskService.getTask(id)
    if (task.userId.toString() !== req.user.userId) {
      throw new UnauthorizedException()
    }
    return await this.taskService.deleteTask(id)
  }
}
