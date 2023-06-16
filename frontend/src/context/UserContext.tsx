/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { UserService } from "../services/user-service"
import { UserInterface } from "../lib/interfaces/user.interface"
import {
  localStorageAccessToken,
  localStorageSelectedListIdKey,
  localStorageUserInfoKey,
  localStorageVerifiedKey,
} from "../constants/constants"
import { useNavigate } from "react-router-dom"
import { useToastContext } from "./ToastContext"
import { useLocation } from "react-router-dom"

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

  // fetchCurrentUser every time user log in as another account
  const location = useLocation()

  const userService = new UserService()

  useEffect(() => {
    fetchCurrentUser()
  }, [location])

  const checkAccess = (userLogin: string, userPassword: string): void => {
    userService
      .checkUserAccess({ login: userLogin, password: userPassword })
      .then((data) => {
        const accessToken = (data as { access_token: string; verified: string }).access_token
        const userVerified = (data as { access_token: string; verified: boolean }).verified

        localStorage.setItem(localStorageAccessToken, JSON.stringify(accessToken))
        localStorage.setItem(localStorageVerifiedKey, JSON.stringify(userVerified))

        if (userVerified === true) {
          navigate("/todos")

          // Reload the page for updating the verified value in UserSlice.tsx
          window.location.reload()
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
        deleteAllToasts()
        addToast({
          variant: "danger",
          message: "Can't log in. Try again.",
          isGlobal: false,
        })
      })
  }

  const fetchCurrentUser = (): void => {
    userService.readUser().then((user) => {
      setCurrentUser(user)
    })
  }

  const logIn = (login?: string, password?: string): void => {
    localStorage.setItem(
      localStorageUserInfoKey,
      JSON.stringify({ userLogin: login, userPassword: password })
    )
    checkAccess(login as string, password as string)
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
    localStorage.setItem(localStorageVerifiedKey, JSON.stringify({}))
    localStorage.setItem(localStorageSelectedListIdKey, JSON.stringify(""))
    navigate("/authentification")
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
        navigate("/authentification")
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
    userService
      .sendResetPasswordMail(login)
      .then(() => {
        addToast({
          variant: "success",
          message: "Check your mailbox where you'll find password reset link.",
          isGlobal: true,
        })
        navigate("/authentification")
      })
      .catch(() => {
        addToast({
          variant: "danger",
          message: "Can't send you a mail.",
          isGlobal: false,
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
