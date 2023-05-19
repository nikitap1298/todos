import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common"
import { ListService } from "../services/list.service"
import { List } from "src/lib/interfaces/list.interface"

@Controller("list/:listId")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  async getAllLists(): Promise<List[]> {
    return this.listService.getAllLists()
  }

  @Post()
  async createList(@Body() list: List): Promise<List> {
    return this.listService.createList(list)
  }

  @Put()
  async updateList(@Param("listId") listId: string, @Body() update: Partial<List>): Promise<any> {
    return this.listService.updateList(listId, update)
  }

  @Delete()
  async deleteList(@Param("listId") listId: string): Promise<any> {
    return this.listService.deleteList(listId)
  }
}
