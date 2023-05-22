import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { List } from "../lib/interfaces/list.interface"
import { Task } from "src/lib/interfaces/task.interface"

@Injectable()
export class ListService {
  constructor(
    @InjectModel("List") private readonly listModel: Model<List>,
    @InjectModel("Task") private readonly taskModel: Model<Task>
  ) {}

  async getAllLists(): Promise<List[]> {
    return await this.listModel.find().exec()
  }

  async createList(list: List): Promise<List> {
    const newList = new this.listModel(list)
    return await newList.save()
  }

  async updateList(listId: string, update: Partial<List>): Promise<any> {
    return await this.listModel.updateOne({ _id: listId }, update)
  }

  async deleteList(listId: string): Promise<any> {
    await this.taskModel.deleteMany({ listId: listId })
    return await this.listModel.deleteOne({ _id: listId })
  }
}
