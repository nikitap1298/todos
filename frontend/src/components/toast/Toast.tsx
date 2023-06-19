import React from "react"
import { ToastContainer, Toast as RBToast } from "react-bootstrap"
import { ToastInterface } from "../../lib/interfaces/toast.interface"
import "./Toast.scss"

interface ToastProps {
  toast: ToastInterface
  onDelete: (index: number) => void
  toastIndex: number
}

export default function Toast(props: ToastProps): JSX.Element {
  const { toast, onDelete, toastIndex } = props

  return (
    <div className="toast-component">
      {toast.isGlobal ? (
        <ToastContainer className="p-3" position="top-end">
          <RBToast show={true} onClose={(): void => onDelete(toastIndex)} bg={toast?.variant}>
            <RBToast.Header>
              <strong className="me-auto">Todos</strong>
              <small>now</small>
            </RBToast.Header>
            <RBToast.Body>{toast?.message}</RBToast.Body>
          </RBToast>
        </ToastContainer>
      ) : (
        <RBToast
          style={{ marginBottom: "10px" }}
          show={true}
          onClose={(): void => onDelete(toastIndex)}
          bg={toast?.variant}
          delay={2000}
          autohide
        >
          <RBToast.Header>
            <strong className="me-auto">Todos</strong>
            <small>now</small>
          </RBToast.Header>
          <RBToast.Body>{toast?.message}</RBToast.Body>
        </RBToast>
      )}
    </div>
  )
}
