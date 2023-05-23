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
    // fetchUsersFromDB()
  }, [])

  const fetchUsersFromDB = (): void => {
    userService
      .readUsers()
      .then((users) => {
        console.log(users)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
  const addNewUser = (login: string, password: string): void => {
    console.log(login);
    
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
