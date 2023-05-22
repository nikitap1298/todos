import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common"
import { ListService } from "../services/list.service"
import { ListInterface } from "../lib/interfaces/list.interface"

@Controller("list/:listId")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  async getAllLists(): Promise<ListInterface[]> {
    return await this.listService.getAllLists()
  }

  @Post()
  async createList(@Body() list: ListInterface): Promise<ListInterface> {
    return await this.listService.createList(list)
  }

  @Put()
  async updateList(@Param("listId") listId: string, @Body() update: Partial<ListInterface>): Promise<any> {
    return await this.listService.updateList(listId, update)
  }

  @Delete()
  async deleteList(@Param("listId") listId: string): Promise<any> {
    return await this.listService.deleteList(listId)
  }
}
