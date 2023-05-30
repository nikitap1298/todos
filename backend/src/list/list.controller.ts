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
} from "@nestjs/common"
import { ListService } from "./list.service"
import { ListInterface } from "./list.interface"
import { AuthGuard } from "../auth/auth.guard"
import { RequestWithUser } from "src/user/user.interface"
import { UserService } from "../user/user.service"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { ListDTO } from "./list.dto"

@Controller("list")
@ApiTags("list")
export class ListController {
  constructor(private readonly listService: ListService, private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: "Found lists", type: [ListDTO] })
  async getAllLists(): Promise<ListInterface[]> {  
    return await this.listService.getAllLists()
  }

  @UseGuards(AuthGuard)
  @Post("/:id")
  @ApiResponse({ status: 201, description: "List to POST", type: ListDTO })
  async createList(
    @Body() list: ListInterface,
    @Request() req: RequestWithUser
  ): Promise<ListInterface> {
    console.log(req.user.userId);
    console.log(list.userId);
    
    
    if (list.userId !== req.user.userId) {
      throw new UnauthorizedException()
    }
    return await this.listService.createList(list)
  }

  @UseGuards(AuthGuard)
  @Delete("/:id")
  @ApiResponse({ status: 200, description: "List to DELETE", type: ListDTO })
  async deleteList(@Param("id") id: string, @Request() req: RequestWithUser): Promise<unknown> {
    const list = await this.listService.getList(id)
    if (list.userId.toString() !== req.user.userId) {
      throw new UnauthorizedException()
    }
    return await this.listService.deleteList(id)
  }
}
