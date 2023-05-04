import React, { useContext, useState } from "react"

const AlertContext = React.createContext({
  alerts: [],
  addAlert: (newAlert: string): void => void {},
  deleteAlert: (index: number): void => void {},
  deleteAllAlerts: (): void => void {},
})

export const AlertContextProvider = ({ children }: any): JSX.Element => {
  const [alerts, setAlertMessages] = useState([])

  const addAlert = (newAlert: string): void => {
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

export const useAlertContext = (): any => useContext(AlertContext) as any
