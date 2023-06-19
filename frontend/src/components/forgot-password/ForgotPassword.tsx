import React, { useState } from "react"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import { Button, Form } from "react-bootstrap"
import { useUserContext } from "../../context/UserContext"
import Toasts from "../toast/Toasts"
import "./ForgotPassword.scss"

export default function ForgotPassword(): JSX.Element {
  const { sendResetPasswordMail } = useUserContext()
  const [loginValue, setLoginValue] = useState("")

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginValue(event.target.value.toLowerCase())
  }

  const handleConfirmClick = (event: MouseFormEvent): void => {
    event.preventDefault()

    if (loginValue.includes("@") && loginValue.includes(".")) {
      sendResetPasswordMail(loginValue)
      setLoginValue("")
    }
  }

  return (
    <div className="forgot-password">
      <h1 className="header">Forgot Password</h1>
      <Toasts />
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            className="input"
            type="email"
            placeholder="Enter email"
            value={loginValue}
            onChange={handleLoginChange}
          />
        </Form.Group>
        <Button className="confirm" type="submit" onClick={handleConfirmClick}>
          Confirm
        </Button>
      </Form>
    </div>
  )
}
