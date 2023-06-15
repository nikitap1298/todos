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
import { useNavigate } from "react-router-dom"
import { useToastContext } from "./ToastContext"

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
  const { addToast, deleteAllToasts } = useToastContext()
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
        const accessToken = (jwt as { access_token: string; verified: string }).access_token
        const userVerified = (jwt as { access_token: string; verified: boolean }).verified

        if (userVerified === true) {
          localStorage.setItem(localStorageAccessToken, JSON.stringify(accessToken))
          setUserHasAccess(true)
          deleteAllToasts()
        } else {
          addToast({
            variant: "success",
            message: "Check your mailbox and confirm email.",
            isGlobal: true,
          })
        }
      })
      .catch(() => {
        setUserHasAccess(false)
        deleteAllToasts()
        addToast({
          variant: "danger",
          message: "Can't log in. Try again.",
          isGlobal: false,
        })
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
      })
      .catch(() => {
        addToast({
          variant: "danger",
          message: "Can't register. Try again.",
          isGlobal: true,
        })
      })
  }

  const logOut = (): void => {
    localStorage.setItem(localStorageAccessToken, JSON.stringify({}))
    localStorage.setItem(localStorageUserInfoKey, JSON.stringify({}))
    localStorage.setItem(localStorageSelectedListIdKey, JSON.stringify(""))
    setUserHasAccess(false)
    deleteAllToasts()
  }

  const confirmEmail = (userId: string, token: string): void => {
    userService
      .verifyUser(userId, token)
      .then(() => {
        logOut()
        addToast({
          variant: "success",
          message: "Email successfully confirmed.",
          isGlobal: true,
        })
        navigate("/todos")
      })
      .catch(() => {
        addToast({
          variant: "danger",
          message: "Can't confirm your email.",
          isGlobal: false,
        })
      })
  }

  const sendResetPasswordMail = (login: string): void => {
    userService.sendResetPasswordMail(login)
    addToast({
      variant: "success",
      message: "Check your mailbox where you'll find password reset link.",
      isGlobal: true,
    })
    navigate("/todos")
  }

  const resetPassword = (userId: string, token: string, newPassword: string): void => {
    userService
      .resetPassword(userId, token, newPassword)
      .then(() => {
        addToast({
          variant: "success",
          message: "Password successfully changed.",
          isGlobal: true,
        })
        navigate("/todos")
      })
      .catch(() => {
        addToast({
          variant: "danger",
          message: "Can't reset the password. Try again.",
          isGlobal: false,
        })
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
