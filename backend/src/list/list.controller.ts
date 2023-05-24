import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common"
import { ListService } from "./list.service"
import { ListInterface } from "./list.interface"
import { AuthGuard } from "../auth/auth.guard"

@Controller("list/:listId")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllLists(): Promise<ListInterface[]> {
    return await this.listService.getAllLists()
  }

  @UseGuards(AuthGuard)
  @Post()
  async createList(@Body() list: ListInterface): Promise<ListInterface> {
    return await this.listService.createList(list)
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateList(
    @Param("listId") listId: string,
    @Body() update: Partial<ListInterface>
  ): Promise<any> {
    return await this.listService.updateList(listId, update)
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteList(@Param("listId") listId: string): Promise<any> {
    return await this.listService.deleteList(listId)
  }
}
