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
  logIn: (login?: string, password?: string) => void
  registerUser: (login: string, password: string) => void
  logOut: () => void
  confirmEmail: (userId: string, token: string) => void
  sendResetPasswordMail: (login: string) => void
  resetPassword: (userId: string, token: string, newPassword: string) => void
}

const UserContext = React.createContext<UserContextInterface>({
  currentUser: { _id: "", login: "", password: "" },
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

  const navigate = useNavigate()

  const userService = new UserService()
  const accessTokenLocalStorage = localStorage.getItem(localStorageAccessToken)

  useEffect(() => {
    fetchCurrentUser()
    logIn()
  }, [])

  const checkAccess = (userLogin: string, userPassword: string, refresh?: boolean): void => {
    userService
      .checkUserAccess({ login: userLogin, password: userPassword })
      .then((data) => {
        const accessToken = (data as { access_token: string; verified: string }).access_token

        localStorage.setItem(localStorageAccessToken, JSON.stringify(accessToken))

        navigate("/todos")

        if (refresh) {
          window.location.reload()
        }
        deleteAllToasts()
      })
      .catch((err) => {
        deleteAllToasts()
        if (err.message.includes("403")) {
          addToast({
            variant: "warning",
            message: "Check your mailbox and confirm email.",
            autohide: false,
          })
        } else {
          addToast({
            variant: "danger",
            message: "Can't log in. Try again.",
            autohide: false,
          })
        }
      })
  }

  const fetchCurrentUser = (): void => {
    userService.readUser().then((user) => {
      setCurrentUser(user)
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

        fetchCurrentUser()
        checkAccess(userLogin, userPassword, true)
      } else if ((accessTokenLocalStorage?.length as number) >= 5) {
        localStorage.setItem(
          localStorageUserInfoKey,
          JSON.stringify({ userId, userLogin, userPassword })
        )
        fetchCurrentUser()
        checkAccess(userLogin, userPassword)
      }
    } else {
      localStorage.setItem(
        localStorageUserInfoKey,
        JSON.stringify({ currentUser, login, password })
      )
      fetchCurrentUser()
      checkAccess(login as string, password as string, true)
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
        checkAccess(login, password, false)
      })
      .catch(() => {
        addToast({
          variant: "danger",
          message: "Can't register. Try again.",
          autohide: false,
        })
      })
  }

  const logOut = (): void => {
    localStorage.setItem(localStorageAccessToken, JSON.stringify({}))
    localStorage.setItem(localStorageUserInfoKey, JSON.stringify({}))
    localStorage.setItem(localStorageSelectedListIdKey, JSON.stringify(""))
    setCurrentUser({ login: "", password: "", verified: false })
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
          autohide: false,
        })
        navigate("/authentification")
      })
      .catch(() => {
        addToast({
          variant: "danger",
          message: "Can't confirm your email.",
          autohide: false,
        })
      })
  }

  const sendResetPasswordMail = (login: string): void => {
    userService
      .sendResetPasswordMail(login)
      .then(() => {
        addToast({
          variant: "success",
          message: "Check your mailbox where you'll find password reset link.",
          autohide: false,
        })
        navigate("/authentification")
      })
      .catch(() => {
        addToast({
          variant: "danger",
          message: "Can't send you a mail.",
          autohide: false,
        })
      })
  }

  const resetPassword = (userId: string, token: string, newPassword: string): void => {
    userService
      .resetPassword(userId, token, newPassword)
      .then(() => {
        addToast({
          variant: "success",
          message: "Password successfully changed.",
          autohide: false,
        })
        navigate("/todos")
      })
      .catch(() => {
        addToast({
          variant: "danger",
          message: "Can't reset the password. Try again.",
          autohide: false,
        })
      })
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
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
