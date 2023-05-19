import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { List } from "../lib/interfaces/list.interface"

@Injectable()
export class ListService {
  constructor(@InjectModel("List") private readonly listModel: Model<List>) {}

  async getAllLists(): Promise<List[]> {
    return this.listModel.find().exec()
  }

  async createList(list: List): Promise<List> {
    const newList = new this.listModel(list)
    return newList.save()
  }

  async updateList(listId: string, update: Partial<List>): Promise<any> {
    return this.listModel.updateOne({ _id: listId }, update)
  }

  async deleteList(listId: string): Promise<any> {
    return this.listModel.deleteOne({ _id: listId })
  }
}
