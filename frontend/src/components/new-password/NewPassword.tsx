import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import { useParams } from "react-router-dom"
import Toasts from "../toast/Toasts"
import { useUserContext } from "../../context/UserContext"
import { useToastContext } from "../../context/ToastContext"
import "./NewPassword.scss"

export default function NewPassword(): JSX.Element {
  const { resetPassword } = useUserContext()
  const { addToast, deleteAllToasts } = useToastContext()
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
      addToast({
        variant: "warning",
        message: "Password must be longer than 6 characters.",
        autohide: false
      })
    } else if (newPasswordValue !== confirmPasswordValue && newPasswordValue.length >= 6) {
      addToast({
        variant: "warning",
        message: "Different passwords.",
        autohide: false
      })
    } else if (newPasswordValue === confirmPasswordValue && newPasswordValue.length >= 6) {
      resetPassword(id as string, token as string, newPasswordValue)
      deleteAllToasts()
      setNewPasswordValue("")
      setConfirmPasswordValue("")
    }
  }

  return (
    <div className="new-password">
      <h1 className="header">New Password</h1>
      <Toasts global={true}/>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className="input"
            type="password"
            placeholder="New password"
            value={newPasswordValue}
            onChange={handleNewPasswordChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="input"
            type="password"
            placeholder="Confirm password"
            value={confirmPasswordValue}
            onChange={handleConfirmPasswordChange}
          />
        </Form.Group>
        <Button className="confirm" type="submit" onClick={handleConfirmClick}>
          Confirm
        </Button>
      </Form>
    </div>
  )
}
