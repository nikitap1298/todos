import { backendServerURL, localStorageAccessToken } from "../constants/constants"

export class APIService {
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem(localStorageAccessToken) as string)}`,
  }

  protected async methodGET(path: string): Promise<unknown> {
    try {
      const response = await fetch(backendServerURL + path, {
        method: "GET",
        headers: this.headers,
      })
      if (response.status !== 200) {
        throw new Error(`Error during GET method: ${response.statusText}`)
      }
      const resultJSON = await response.json()
      return resultJSON
    } catch (error) {
      throw new Error(`Error during GET method. ${error}`)
    }
  }

  protected async methodPOST(path: string, data: unknown): Promise<unknown> {
    const response = await fetch(backendServerURL + path, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    })
    try {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Error during POST method: ${response.statusText}`)
      }
      const resultJSON = await response.json()
      return resultJSON
    } catch (error) {
      throw new Error(`Error during POST method: ${error}. Code: ${response.status}`)
    }
  }

  protected async methodPUT(path: string, data: unknown): Promise<unknown> {
    try {
      const response = await fetch(backendServerURL + path, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify(data),
      })
      if (response.status !== 200) {
        throw new Error(`Error during PUT method: ${response.statusText}`)
      }
      const resultJSON = await response.json()
      return resultJSON
    } catch (error) {
      throw new Error(`Error during PUT method. ${error}`)
    }
  }

  protected async methodDELETE(path: string, data: unknown): Promise<unknown> {
    try {
      const response = await fetch(backendServerURL + path, {
        method: "DELETE",
        headers: this.headers,
        body: JSON.stringify(data),
      })
      if (response.status !== 200) {
        throw new Error(`Error during DELETE method: ${response.statusText}`)
      }
      const resultJSON = await response.json()
      return resultJSON
    } catch (error) {
      throw new Error(`Error during DELETE method. ${error}`)
    }
  }
}
