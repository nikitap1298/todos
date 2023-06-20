import React, { useContext, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { ToastInterface } from "../lib/interfaces/toast.interface"

interface ToastContextInterface {
  toasts: ToastInterface[]
  addToast: (toast: ToastInterface) => void
  deleteToast: (index: number) => void
  deleteAllToasts: () => void
}

const ToastContext = React.createContext<ToastContextInterface>({
  toasts: [],
  addToast: () => void {},
  deleteToast: () => void {},
  deleteAllToasts: () => void {},
})

export const ToastContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  const [toasts, setToasts] = useState<ToastInterface[]>([])

  const addToast = (toast: ToastInterface): void => {
    setToasts((oldArray) => [...oldArray, toast])
  }

  const deleteToast = (index: number): void => {
    const allToasts = [...toasts]
    allToasts.splice(index, 1)
    setToasts(allToasts)
  }

  const deleteAllToasts = (): void => {
    setToasts([])
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, deleteToast, deleteAllToasts }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToastContext = (): ToastContextInterface => useContext(ToastContext)
