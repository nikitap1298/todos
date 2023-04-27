import React, { useContext, useState } from "react"

const AlertContext = React.createContext({
  alerts: [],
  addAlert: (newAlert: string) => {},
  deleteAlert: (index: number) => {},
  deleteAllAlerts: () => {},
})

export const AlertContextProvider = ({ children }: any) => {
  let [alerts, setAlertMessages] = useState([])

  const addAlert = (newAlert: string) => {
    setAlertMessages((oldArray) => [...oldArray, newAlert])
  }

  const deleteAlert = (index: number) => {
    const allAlerts = [...alerts]
    allAlerts.splice(index, 1)
    setAlertMessages(allAlerts)
  }

  const deleteAllAlerts = () => {
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
