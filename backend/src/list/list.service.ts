import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { ListInterface } from "./list.interface"
import { TaskInterface } from "../task/task.interface"

@Injectable()
export class ListService {
  constructor(
    @InjectModel("List") private readonly listModel: Model<ListInterface>,
    @InjectModel("Task") private readonly taskModel: Model<TaskInterface>
  ) {}

  async getList(id: string): Promise<ListInterface> {
    return await this.listModel.findOne({ _id: id })
  }

  async getLists(userId: string): Promise<ListInterface[]> {
    return await this.listModel.find({ userId: userId })
  }

  async createList(list: ListInterface): Promise<ListInterface> {
    const newList = new this.listModel(list)
    return await newList.save()
  }

  async deleteList(listId: string): Promise<unknown> {
    await this.taskModel.deleteMany({ listId: listId })
    return await this.listModel.deleteOne({ _id: listId })
  }
}
