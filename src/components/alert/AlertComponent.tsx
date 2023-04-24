import React from "react"
import Alert from "react-bootstrap/Alert"

function AlertComponent({ title, message }) {
  return (
    <Alert className="alert" variant="danger" dismissible>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  )
}

export default AlertComponent
