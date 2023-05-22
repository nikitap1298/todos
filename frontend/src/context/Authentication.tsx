/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { AuthenticationService } from "../services/authentication-service"

interface AuthenticationContextInterface {
  addNewUser: (login: string, password: string) => void
}

const AuthenticationContext = React.createContext<AuthenticationContextInterface>({
  addNewUser: () => void {},
})

export const AuthenticationContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  const authenticationService = new AuthenticationService()

  useEffect(() => {
    fetchUsersFromDB()
  }, [])

  const fetchUsersFromDB = (): void => {
    authenticationService
      .readUsers()
      .then((users) => {
        console.log(users)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
  const addNewUser = (login: string, password: string): void => {
    authenticationService
      .addUser({ login: login, password: password })
      .then((newUser) => {
        console.log(newUser)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return <AuthenticationContext.Provider value={{ addNewUser }}></AuthenticationContext.Provider>
}

export const useAuthenticationContext = (): AuthenticationContextInterface =>
  useContext(AuthenticationContext)
