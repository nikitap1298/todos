import React from "react"
import Alert from "react-bootstrap/Alert"
import { AlertContext } from "../app/App"
import "./AlertComponent.scss"

function AlertComponent() {
  const { title, message } = React.useContext(AlertContext)

  return (
    <Alert className="alert" variant="danger" dismissible>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  )
}

export default AlertComponent
