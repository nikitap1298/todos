import { ListInterface } from "../lib/interfaces/list.interface"
import { APIService } from "./api-service"

export class ListsService extends APIService {
  async readLists(): Promise<ListInterface[]> {
    return (await this.methodGET(`/lists`)) as ListInterface[]
  }

  async addList(list: ListInterface): Promise<ListInterface> {
    return (await this.methodPOST(`/lists/${list._id}`, list)) as ListInterface
  }

  async deleteList(list: ListInterface): Promise<ListInterface> {
    return (await this.methodDELETE(`/lists/${list._id}`, list)) as ListInterface
  }
}
