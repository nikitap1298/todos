import React from "react"
import Alert from "react-bootstrap/Alert"

function AlertComponent() {
  return (
    <Alert variant="danger" dismissible>
      <Alert.Heading>This task already exists!</Alert.Heading>
      <p>Please, add something else.</p>
    </Alert>
  )
}

export default AlertComponent
