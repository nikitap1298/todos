import { ListInterface } from "../lib/interfaces/list.interface"
import { APIService } from "./api-service"

export class ListsService extends APIService {
  async readLists(): Promise<ListInterface[]> {
    return (await this.methodGET(`/list/_id`)) as ListInterface[]
  }

  async addList(list: ListInterface): Promise<ListInterface> {
    return (await this.methodPOST(`/list/${list._id}`, list)) as ListInterface
  }
}
