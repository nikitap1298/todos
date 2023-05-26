import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, UnauthorizedException } from "@nestjs/common"
import { ListService } from "./list.service"
import { ListInterface } from "./list.interface"
import { AuthGuard } from "../auth/auth.guard"
import { RequestWithUser } from "src/user/user.interface";
import { UserService } from "../user/user.service";

@Controller("list/:id")
export class ListController {
  constructor(private readonly listService: ListService, private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllLists(@Request() req:RequestWithUser): Promise<ListInterface[]> {
    return await this.listService.getAllLists()
  }

  @UseGuards(AuthGuard)
  @Post()
  async createList(@Body() list: ListInterface): Promise<ListInterface> {
    return await this.listService.createList(list)
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateList(@Param("id") id: string, @Body() update: Partial<ListInterface>): Promise<unknown> {
    return await this.listService.updateList(id, update)
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteList(@Param("id") id: string, @Request() req: RequestWithUser): Promise<unknown> {
    const list = await this.listService.getList(id);
    if(list.userId!=req.user.userId){
      throw new UnauthorizedException();
    }
    return await this.listService.deleteList(id)
  }
}
