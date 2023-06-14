import React from "react"
import { useToastContext } from "../../context/ToastContext"
import ToastComponent from "./ToastComponent"
import { ToastInterface } from "../../lib/interfaces/toast.interface"
import { v4 as uuidv4 } from "uuid"

export default function ToastsComponent(): JSX.Element {
  const { toasts, deleteToast } = useToastContext()

  return (
    <div>
      {toasts.map((toast: ToastInterface, index: number) => (
        <ToastComponent key={uuidv4()} toast={toast} onDelete={deleteToast} toastIndex={index} />
      ))}
    </div>
  )
}
