import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
  NotFoundException,
  Put,
} from "@nestjs/common"
import { ListService } from "./list.service"
import { ListInterface } from "./list.interface"
import { AuthGuard } from "../auth/auth.guard"
import { RequestWithUser } from "src/user/user.interface"
import { UserService } from "../user/user.service"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { ListDTO } from "./list.dto"

@Controller("lists")
@ApiTags("lists")
export class ListController {
  constructor(private readonly listService: ListService, private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: "Found lists", type: [ListDTO] })
  async getLists(@Request() req: RequestWithUser): Promise<ListInterface[]> {
    const userId = req.user.userId
    return await this.listService.getLists(userId)
  }

  @UseGuards(AuthGuard)
  @Post("/:id")
  @ApiResponse({ status: 201, description: "List to POST", type: ListDTO })
  @ApiResponse({ status: 401, description: "You are not authorized to POST", type: ListDTO })
  async createList(
    @Body() list: ListInterface,
    @Request() req: RequestWithUser
  ): Promise<ListInterface> {
    if (list.userId !== req.user.userId) {
      throw new UnauthorizedException()
    }
    return await this.listService.createList(list)
  }

  @UseGuards(AuthGuard)
  @Put("/:id")
  @ApiResponse({ status: 200, description: "Task to PUT", type: ListDTO })
  @ApiResponse({ status: 401, description: "You are not authorized to PUT", type: ListDTO })
  @ApiResponse({ status: 404, description: "Task not found", type: ListDTO })
  async updateTask(
    @Param("id") id: string,
    @Body() update: Partial<ListInterface>,
    @Request() req: RequestWithUser
  ): Promise<unknown> {
    const list = await this.listService.getList(id)
    if (list.userId.toString() !== req.user.userId) {
      throw new UnauthorizedException()
    }
    if (list.id !== id) {
      throw new NotFoundException()
    }
    return await this.listService.updateList(id, update)
  }

  @UseGuards(AuthGuard)
  @Delete("/:id")
  @ApiResponse({ status: 200, description: "List to DELETE", type: ListDTO })
  @ApiResponse({ status: 401, description: "You are not authorized to DELETE", type: ListDTO })
  @ApiResponse({ status: 404, description: "List not found", type: ListDTO })
  async deleteList(@Param("id") id: string, @Request() req: RequestWithUser): Promise<unknown> {
    const list = await this.listService.getList(id)
    if (list.userId.toString() !== req.user.userId) {
      throw new UnauthorizedException()
    }
    if (list.id !== id) {
      throw new NotFoundException()
    }
    return await this.listService.deleteList(id)
  }
}
