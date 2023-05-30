/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { UserService } from "../services/user-service"
import { UserInterface } from "../lib/interfaces/user.interface"
import { localStorageAccessToken, localStorageUserInfoKey } from "../constants/constants"

interface UserContextInterface {
  currentUser: UserInterface | undefined
  userHasAccess: boolean
  logIn: (login?: string, password?: string) => void
  registerUser: (login: string, password: string) => void
  logOut: () => void
}

const UserContext = React.createContext<UserContextInterface>({
  currentUser: { _id: "", login: "", password: "" },
  userHasAccess: false,
  logIn: () => void {},
  registerUser: () => void {},
  logOut: () => void {},
})

export const UserContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<UserInterface>()
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
    fetchCurrentUser()
  }, [userHasAccess])

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
        userId = currentUser?._id
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

  const fetchCurrentUser = (): void => {
    userService
      .readUser()
      .then((user) => {
        console.log(user)
        setCurrentUser(user)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const registerUser = (login: string, password: string): void => {
    userService
      .registerUser({ login: login, password: password })
      .then((user) => {
        const userId = user._id
        localStorage.setItem(
          localStorageUserInfoKey,
          JSON.stringify({ userId, userLogin: login, userPassword: password })
        )
        setCurrentUser(user)
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

  return (
    <UserContext.Provider value={{ currentUser, userHasAccess, logIn, registerUser, logOut }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextInterface => useContext(UserContext)
