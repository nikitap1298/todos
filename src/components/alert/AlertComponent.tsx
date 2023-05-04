import React from "react"
import { Alert } from "react-bootstrap"
import { AlertInterface } from "../../lib/interfaces/alert.interface"
import "./AlertComponent.scss"

interface AlertComponentProps {
  alert: AlertInterface
  onDelete: (index: number) => void
  alertIndex: number
}

export default function AlertComponent(
  props: AlertComponentProps
): JSX.Element {
  const { alert, onDelete, alertIndex } = props

  return (
    <Alert
      className="alert"
      variant="danger"
      dismissible
      onClick={() => onDelete(alertIndex)}
    >
      <Alert.Heading>{alert.title}</Alert.Heading>
      <p>{alert.message}</p>
    </Alert>
  )
}
