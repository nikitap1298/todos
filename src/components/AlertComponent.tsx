import React from "react"
import Alert from "react-bootstrap/Alert"

function AlertComponent(props) {
  return (
    <Alert variant="danger" dismissible>
      <Alert.Heading>{props.title}</Alert.Heading>
      <p>{props.message}</p>
    </Alert>
  )
}

export default AlertComponent
