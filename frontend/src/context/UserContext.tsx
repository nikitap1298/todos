/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { UserService } from "../services/user-service"
import { UserInterface } from "../lib/interfaces/user.interface"
import { localStorageUserInfoKey } from "../constants/constants"

interface UserContextInterface {
  users: UserInterface[]
  userHasAccess: boolean
  addNewUser: (login: string, password: string) => void
  logOut: () => void
}

const UserContext = React.createContext<UserContextInterface>({
  users: [],
  userHasAccess: false,
  addNewUser: () => void {},
  logOut: () => void {},
})

export const UserContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [userHasAccess, setUserHasAccess] = useState(false)

  const userService = new UserService()

  useEffect(() => {
    checkUserAccess()
    fetchUsersFromDB()
  }, [])

  const checkUserAccess = (): void => {
    const userInfoLocalStorage = localStorage.getItem(localStorageUserInfoKey)
    if (userInfoLocalStorage) {
      const userInfo = JSON.parse(userInfoLocalStorage)
      userService
        .checkUserAccess(userInfo)
        .then(() => {
          setUserHasAccess(true)
        })
        .catch((error) => {
          setUserHasAccess(false)
          throw new Error(error)
        })
    }
  }

  const fetchUsersFromDB = (): void => {
    userService
      .readUsers()
      .then((users) => {
        setUsers(users as UserInterface[])
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const addNewUser = (login: string, password: string): void => {
    userService
      .addUser({ login: login, password: password })
      .then(() => {
        localStorage.setItem(localStorageUserInfoKey, JSON.stringify({ login, password }))
        setUserHasAccess(true)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const logOut = (): void => {
    localStorage.setItem(localStorageUserInfoKey, JSON.stringify({}))
    setUserHasAccess(false)
  }

  return (
    <UserContext.Provider value={{ users, userHasAccess, addNewUser, logOut }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextInterface => useContext(UserContext)
