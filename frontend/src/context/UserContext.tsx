/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { UserService } from "../services/user-service"

interface UserContextInterface {
  addNewUser: (login: string, password: string) => void
}

const UserContext = React.createContext<UserContextInterface>({
  addNewUser: () => void {},
})

export const UserContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  const userService = new UserService()

  useEffect(() => {
    checkUserAccess()
  }, [])

  const checkUserAccess = (): void => {
    userService
      .checkUserAccess({ login: "nikita", password: "1298" })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(`Don't have access because of the error: ${error}`)
      })
  }

  const addNewUser = (login: string, password: string): void => {
    userService
      .addUser({ login: login, password: password })
      .then((newUser) => {
        console.log(newUser)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return <UserContext.Provider value={{ addNewUser }}>{children}</UserContext.Provider>
}

export const useUserContext = (): UserContextInterface => useContext(UserContext)
