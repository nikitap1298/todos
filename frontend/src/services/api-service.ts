import { backendServerURL } from "../constants/constants"

export class APIService {
  private headers = {
    "Content-Type": "application/json",
  }

  protected async methodGET(path: string): Promise<unknown> {
    const response = await fetch(backendServerURL + path, {
      method: "GET",
      headers: this.headers,
    }).catch((error) => {
      throw new Error(`Error during GET method: ${error}`)
    })
    if (response.status !== 200) {
      throw new Error(`Error during GET method: ${response.statusText}`)
    }
    const resultJSON = await response.json()
    return resultJSON
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
    const resultJSON = await response.json()
    return resultJSON
  }

  protected async methodPUT(path: string, data: unknown): Promise<unknown> {
    const response = await fetch(backendServerURL + path, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data),
    }).catch((error) => {
      throw new Error(`Error during PUT method: ${error}`)
    })
    if (response.status !== 200) {
      throw new Error(`Error during PUT method: ${response.statusText}`)
    }
    const resultJSON = await response.json()
    return resultJSON
  }

  protected async methodDELETE(path: string, data: unknown): Promise<unknown> {
    const response = await fetch(backendServerURL + path, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify(data),
    }).catch((error) => {
      throw new Error(`Error during DELETE method: ${error}`)
    })
    if (response.status !== 200) {
      throw new Error(`Error during DELETE method: ${response.statusText}`)
    }
    const resultJSON = await response.json()
    return resultJSON
  }
}
