import { backendServerURL } from "../constants/constants"
import { TaskInterface } from "../lib/interfaces/task.interface"

export class APIService {
  private headers = {
    "Content-Type": "application/json",
  }

  protected methodGET = (path: string): Promise<TaskInterface[]> => {
    return fetch(backendServerURL + path, {
      method: "GET",
      headers: this.headers,
    })
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => {
        throw new Error(`Error during GET method: ${error}`)
      })
  }

  protected async methodPOST(path: string, data: unknown): Promise<unknown> {
    const response = await fetch(backendServerURL + path, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).catch((error) => {
      throw new Error(`Error during POST method: ${error}`)
    })
    if (response.status !== 200) {
      throw new Error(`Error during POST method: ${response.statusText}`)
    }
    const resultJson = await response.json()
    console.log(resultJson)
    return resultJson
  }

  protected methodPUT = (path: string, data: TaskInterface): void => {
    fetch(backendServerURL + path, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data),
    }).catch((error) => {
      throw new Error(`Error during PUT method: ${error}`)
    })
  }

  protected methodDELETE = (path: string, data: TaskInterface): void => {
    fetch(backendServerURL + path, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify(data),
    }).catch((error) => {
      throw new Error(`Error during DELETE method: ${error}`)
    })
  }
}
