/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import {
  AlertContextInterface,
  AlertInterface,
} from "../lib/interfaces/alert.interface"

const AlertContext = React.createContext<AlertContextInterface>({
  alerts: [],
  addAlert: (newAlert: AlertInterface): void => void {},
  deleteAlert: (index: number): void => void {},
  deleteAllAlerts: (): void => void {},
})

export const AlertContextProvider = ({
  children,
}: ContextProviderProps): JSX.Element => {
  const [alerts, setAlertMessages] = useState<AlertInterface[]>([])

  const addAlert = (newAlert: AlertInterface): void => {
    setAlertMessages((oldArray) => [...oldArray, newAlert])
  }

  const deleteAlert = (index: number): void => {
    const allAlerts = [...alerts]
    allAlerts.splice(index, 1)
    setAlertMessages(allAlerts)
  }

  const deleteAllAlerts = (): void => {
    setAlertMessages([])
  }

  return (
    <AlertContext.Provider
      value={{ alerts, addAlert, deleteAlert, deleteAllAlerts }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export const useAlertContext = (): AlertContextInterface =>
  useContext(AlertContext)
