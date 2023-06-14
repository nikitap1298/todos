import React from "react"
import { ToastContainer, Toast } from "react-bootstrap"
import { ToastInterface } from "../../lib/interfaces/toast.interface"
import "./ToastComponent.scss"

interface ToastComponentProps {
  toast: ToastInterface
  onDelete: (index: number) => void
  toastIndex: number
}

export default function ToastComponent(props: ToastComponentProps): JSX.Element {
  const { toast, onDelete, toastIndex } = props

  return (
    <div className="toast-component">
      {toast.isGlobal ? (
        <ToastContainer className="p-3" position="top-end">
          <Toast show={true} onClose={(): void => onDelete(toastIndex)} bg={toast?.variant}>
            <Toast.Header>
              <strong className="me-auto">Todos</strong>
              <small>now</small>
            </Toast.Header>
            <Toast.Body>{toast?.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : (
        <Toast
          style={{ marginBottom: "10px" }}
          show={true}
          onClose={(): void => onDelete(toastIndex)}
          bg={toast?.variant}
          delay={2000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Todos</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body>{toast?.message}</Toast.Body>
        </Toast>
      )}
    </div>
  )
}
