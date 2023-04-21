import React from "react"
import Alert from "react-bootstrap/Alert"

function AlertComponent({ title, message }) {
  const alertTitleStyle = {
    fontFamily: "Dongle",
    fontSize: "2rem",
    fontWeight: "400",
  }

  const alertMessageStyle = {
    fontFamily: "Dongle",
    fontSize: "1.7rem",
    fontWeight: "300",
  }

  return (
    <Alert variant="danger" dismissible>
      <Alert.Heading style={alertTitleStyle}>{title}</Alert.Heading>
      <p style={alertMessageStyle}>{message}</p>
    </Alert>
  )
}

export default AlertComponent
