import React from "react"
import Alert from "react-bootstrap/Alert"

function AlertComponent({ message, title }) {
  return (
    <Alert variant="danger" dismissible>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  )
}

export default AlertComponent
