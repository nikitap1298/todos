/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { UserService } from "../services/user-service"
import { UserInterface } from "../lib/interfaces/user.interface"
import { localStorageAccessToken, localStorageUserInfoKey } from "../constants/constants"

interface UserContextInterface {
  users: UserInterface[]
  userHasAccess: boolean
  logIn: (login?: string, password?: string) => void
  addNewUser: (login: string, password: string) => void
  logOut: () => void
  deleteUser: (userId: string) => void
}

const UserContext = React.createContext<UserContextInterface>({
  // TODO: we only need the current user, not all users, so this should be user or currentUser
  users: [],
  userHasAccess: false,
  logIn: () => void {},
  // TODO:: this should be registerUser
  addNewUser: () => void {},
  logOut: () => void {},
  deleteUser: () => void {},
})

export const UserContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [userHasAccess, setUserHasAccess] = useState(false)

  const userService = new UserService()
  // TODO: to not douplicate your code whenever you need the token you can implement this directly in the Api Service, 
  // the all the services that extends the Api Service will have access to the token
  const accessTokenLocalStorage = localStorage.getItem(localStorageAccessToken)
  if (accessTokenLocalStorage) {
    userService.setAuthorizationToken(`Bearer ${JSON.parse(accessTokenLocalStorage)}`)
  }

  useEffect(() => {
    logIn()
    fetchUsersFromDB()
  }, [])

  const checkAccess = (userLogin: string, userPassword: string): void => {
    userService
      .checkUserAccess({ login: userLogin, password: userPassword })
      .then((jwt) => {
        const accessToken = (jwt as { access_token: string }).access_token
        localStorage.setItem(localStorageAccessToken, JSON.stringify(accessToken))
        setUserHasAccess(true)
      })
      .catch((error) => {
        setUserHasAccess(false)
        throw new Error(error)
      })
  }

  const logIn = (login?: string, password?: string): void => {
    const userInfoLocalStorage = localStorage.getItem(localStorageUserInfoKey)
    if (userInfoLocalStorage) {
      let userId = JSON.parse(userInfoLocalStorage).userId
      let userLogin = JSON.parse(userInfoLocalStorage).userLogin
      let userPassword = JSON.parse(userInfoLocalStorage).userPassword

      if (typeof login === "string" && typeof password === "string") {
        userId = users.find((element) => element.login === login)?._id
        userLogin = login
        userPassword = password
        localStorage.setItem(
          localStorageUserInfoKey,
          JSON.stringify({ userId, userLogin, userPassword })
        )
      } else {
        localStorage.setItem(
          localStorageUserInfoKey,
          JSON.stringify({ userId, userLogin, userPassword })
        )
      }

      checkAccess(userLogin, userPassword)
    }
  }

  // todo: only get current user, and you are not fetching from DB but from the api, so you should name it fetchCurrentUser
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
      .then((user) => {
        const userId = user._id
        localStorage.setItem(
          localStorageUserInfoKey,
          JSON.stringify({ userId, userLogin: login, userPassword: password })
        )
        setUsers((oldArray) => [...oldArray, user])
        checkAccess(login, password)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const logOut = (): void => {
    localStorage.setItem(localStorageAccessToken, JSON.stringify({}))
    localStorage.setItem(localStorageUserInfoKey, JSON.stringify({}))
    setUserHasAccess(false)
  }

  const deleteUser = (userId: string): void => {
    const deletedUser = users.find((element) => element._id === userId) as UserInterface
    const newUsers = users.filter((element) => element._id !== userId)

    userService.deleteUser(deletedUser).then(() => {
      setUsers(newUsers)
      localStorage.setItem(localStorageAccessToken, JSON.stringify({}))
      localStorage.setItem(localStorageUserInfoKey, JSON.stringify({}))
      setUserHasAccess(false)
    })
  }

  return (
    <UserContext.Provider value={{ users, userHasAccess, logIn, addNewUser, logOut, deleteUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextInterface => useContext(UserContext)
