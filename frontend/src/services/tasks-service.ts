import { TaskInterface } from "../lib/interfaces/task.interface"
import { APIService } from "./api-service"

export class TasksService extends APIService {
  readTasks = (): Promise<TaskInterface[]> => {
    return this.methodGET("/task")
      .then((data) => {
        return data
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  sendTasks = (tasks: TaskInterface[]): void => {
    this.methodPOST("/task", tasks)
  }

  //   updateTask(task: TaskInterface){
  //       this.methodPUT(`/task/${task.id}`, task)
  //   }

  updateTask = (tasks: TaskInterface[]): void => {
    this.methodPUT("/task", tasks)
  }
}
