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

  async getAllLists(): Promise<ListInterface[]> {
    return await this.listModel.find().exec()
  }

  async createList(list: ListInterface): Promise<ListInterface> {
    const newList = new this.listModel(list)
    return await newList.save()
  }

  async updateList(listId: string, update: Partial<ListInterface>): Promise<any> {
    return await this.listModel.updateOne({ _id: listId }, update)
  }

  async deleteList(listId: string): Promise<any> {
    await this.taskModel.deleteMany({ listId: listId })
    return await this.listModel.deleteOne({ _id: listId })
  }
}
