/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { UserService } from "../services/user-service"
import { UserInterface } from "../lib/interfaces/user.interface"
import {
  localStorageAccessToken,
  localStorageSelectedListIdKey,
  localStorageUserInfoKey,
} from "../constants/constants"
import { useAlertContext } from "./AlertContext"
import { useNavigate } from "react-router-dom"

interface UserContextInterface {
  currentUser: UserInterface | undefined
  userHasAccess: boolean
  logIn: (login?: string, password?: string) => void
  registerUser: (login: string, password: string) => void
  logOut: () => void
  confirmEmail: (userId: string, token: string) => void
  sendResetPasswordMail: (login: string) => void
  resetPassword: (userId: string, token: string, newPassword: string) => void
}

const UserContext = React.createContext<UserContextInterface>({
  currentUser: { _id: "", login: "", password: "" },
  userHasAccess: false,
  logIn: () => void {},
  registerUser: () => void {},
  logOut: () => void {},
  confirmEmail: () => void {},
  sendResetPasswordMail: () => void {},
  resetPassword: () => void {},
})

export const UserContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  const { addAlert, deleteAllAlerts } = useAlertContext()
  const [currentUser, setCurrentUser] = useState<UserInterface>()
  const [userHasAccess, setUserHasAccess] = useState(false)

  const navigate = useNavigate()

  const userService = new UserService()
  const accessTokenLocalStorage = localStorage.getItem(localStorageAccessToken)

  useEffect(() => {
    fetchCurrentUser()
    logIn()
  }, [userHasAccess])

  const checkAccess = (userLogin: string, userPassword: string): void => {
    userService
      .checkUserAccess({ login: userLogin, password: userPassword })
      .then((jwt) => {
        const accessToken = (jwt as { access_token: string }).access_token
        localStorage.setItem(localStorageAccessToken, JSON.stringify(accessToken))
        setUserHasAccess(true)
      })
      .catch(() => {
        setUserHasAccess(false)
      })
  }

  const fetchCurrentUser = (): void => {
    userService
      .readUser()
      .then((user) => {
        setCurrentUser(user)
      })
      .catch(() => {
        logOut()
      })
  }

  const logIn = (login?: string, password?: string): void => {
    const userInfoLocalStorage = localStorage.getItem(localStorageUserInfoKey)
    if (userInfoLocalStorage) {
      let userId = JSON.parse(userInfoLocalStorage).userId
      let userLogin = JSON.parse(userInfoLocalStorage).userLogin
      let userPassword = JSON.parse(userInfoLocalStorage).userPassword

      if (
        typeof login === "string" &&
        typeof password === "string" &&
        (accessTokenLocalStorage?.length as number) <= 4
      ) {
        userId = currentUser?._id
        userLogin = login
        userPassword = password
        localStorage.setItem(
          localStorageUserInfoKey,
          JSON.stringify({ userId, userLogin, userPassword })
        )
        checkAccess(userLogin, userPassword)
      } else if ((accessTokenLocalStorage?.length as number) >= 5) {
        localStorage.setItem(
          localStorageUserInfoKey,
          JSON.stringify({ userId, userLogin, userPassword })
        )
        setUserHasAccess(true)
      }
    }
  }

  const registerUser = (login: string, password: string): void => {
    userService
      .registerUser({ login: login, password: password, verified: false })
      .then((user) => {
        const userId = user._id
        localStorage.setItem(
          localStorageUserInfoKey,
          JSON.stringify({ userId, userLogin: login, userPassword: password })
        )
        setCurrentUser(user)
        checkAccess(login, password)
        deleteAllAlerts()
      })
      .catch(() => {
        addAlert({
          title: "Error with registration",
          message: "Can't register",
        })
      })
  }

  const logOut = (): void => {
    localStorage.setItem(localStorageAccessToken, JSON.stringify({}))
    localStorage.setItem(localStorageUserInfoKey, JSON.stringify({}))
    localStorage.setItem(localStorageSelectedListIdKey, JSON.stringify(""))
    setUserHasAccess(false)
  }

  const confirmEmail = (userId: string, token: string): void => {
    // localStorage.setItem(localStorageAccessToken, JSON.stringify({}))
    userService
      .verifyUser(userId, token)
      .then(() => {
        deleteAllAlerts()
        logOut()
        navigate("/todos")
      })
      .catch(() => {
        addAlert({
          title: "Error with email confirmation",
          message: "Can't verify",
        })
      })
  }

  const sendResetPasswordMail = (login: string): void => {
    userService.sendResetPasswordMail(login).then((data) => {
      console.log(data)
    })
  }

  const resetPassword = (userId: string, token: string, newPassword: string): void => {
    userService.resetPassword(userId, token, newPassword).then(() => {
      navigate("/todos")
    })
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        userHasAccess,
        logIn,
        registerUser,
        logOut,
        confirmEmail,
        sendResetPasswordMail,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextInterface => useContext(UserContext)
