import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import { useParams } from "react-router-dom"
import AlertsComponent from "../alert/AlertsComponent"
import { useUserContext } from "../../context/UserContext"
import { useAlertContext } from "../../context/AlertContext"
import "./NewPassword.scss"

export default function NewPassword(): JSX.Element {
  const { resetPassword } = useUserContext()
  const { addAlert, deleteAllAlerts } = useAlertContext()
  const { id, token } = useParams()

  const [newPasswordValue, setNewPasswordValue] = useState("")
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("")

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPasswordValue(event.target.value)
  }

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmPasswordValue(event.target.value)
  }

  const handleConfirmClick = (event: MouseFormEvent): void => {
    event.preventDefault()

    if (newPasswordValue.length < 6) {
      addAlert({
        title: "Password is not safe",
        message: "Password must be longer than 6 characters",
      })
    } else if (newPasswordValue !== confirmPasswordValue && newPasswordValue.length >= 6) {
      addAlert({
        title: "Error",
        message: "Different passwords",
      })
    } else if (newPasswordValue === confirmPasswordValue && newPasswordValue.length >= 6) {
      resetPassword(id as string, token as string, newPasswordValue)
      deleteAllAlerts()
      setNewPasswordValue("")
      setConfirmPasswordValue("")
    }
  }

  return (
    <div className="new-password">
      <h1>New Password</h1>
      <AlertsComponent />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="password"
            placeholder="New password"
            value={newPasswordValue}
            onChange={handleNewPasswordChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPasswordValue}
            onChange={handleConfirmPasswordChange}
          />
        </Form.Group>
        <Button
          className="confirm-button"
          variant="primary"
          type="submit"
          onClick={handleConfirmClick}
        >
          Confirm
        </Button>
      </Form>
    </div>
  )
}
