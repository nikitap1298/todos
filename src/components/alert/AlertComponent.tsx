import React from "react"
import { Alert } from "react-bootstrap"
import "./AlertComponent.scss"

interface AlertComponentProps {
  alert: string
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
      <Alert.Heading>This task already exists:</Alert.Heading>
      <p>{alert}</p>
    </Alert>
  )
}

export default AlertComponent
