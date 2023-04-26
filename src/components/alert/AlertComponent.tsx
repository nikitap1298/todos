import React from "react"
import { Alert } from "react-bootstrap"
import { useTaskContext } from "../../context/TaskContext"
import "./AlertComponent.scss"

function AlertComponent() {
  const { showAlert, alertMessage } = useTaskContext()

  return (
    <>
      {showAlert ? (
        <Alert className="alert" variant="danger" dismissible>
          <Alert.Heading>This task already exists:</Alert.Heading>
          <p>{alertMessage}</p>
        </Alert>
      ) : null}
    </>
  )
}

export default AlertComponent
