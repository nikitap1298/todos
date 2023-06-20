import React from "react"
import { useToastContext } from "../../context/ToastContext"
import Toast from "./Toast"
import { ToastInterface } from "../../lib/interfaces/toast.interface"
import { v4 as uuidv4 } from "uuid"

interface ToastsProps {
  global: boolean
}

export default function Toasts(props: ToastsProps): JSX.Element {
  const { global } = props
  const { toasts, deleteToast } = useToastContext()

  return (
    <div>
      {toasts.map((toast: ToastInterface, index: number) => (
        <Toast
          key={uuidv4()}
          toast={toast}
          global={global}
          onDelete={deleteToast}
          toastIndex={index}
        />
      ))}
    </div>
  )
}
