import React from "react"
import { Alert } from "react-bootstrap"
import "./AlertComponent.scss"

interface AlertInterface {
  title: string
  message: string
}

interface AlertComponentProps {
  alert: AlertInterface
  onDelete: (index: number) => void
  alertIndex: number
}

function AlertComponent(props: AlertComponentProps) {
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

export default AlertComponent
