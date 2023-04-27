import React, { useContext, useState } from "react"

const AlertContext = React.createContext({
  alerts: [],
  addAlert: (newAlert: string) => {},
  deleteAlert: (index: number) => {},
})

export const AlertContextProvider = ({ children }: any) => {
  let [alerts, setAlerts] = useState([])

  const addAlert = (newAlert: string) => {
    setAlerts((oldArray) => [...oldArray, newAlert])
  }

  const deleteAlert = (index: number) => {
    const allAlerts = [...alerts]
    allAlerts.splice(index, 1)
    setAlerts(allAlerts)
  }

  return (
    <AlertContext.Provider value={{ alerts, addAlert, deleteAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlertContext = (): any => useContext(AlertContext) as any
