import React from "react"
import Alert from "react-bootstrap/Alert"
import { AlertContext } from "../app/App"

function AlertComponent() {
  const title = React.useContext(AlertContext).title
  const message = React.useContext(AlertContext).message
  return (
    <Alert className="alert" variant="danger" dismissible>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  )
}

export default AlertComponent
