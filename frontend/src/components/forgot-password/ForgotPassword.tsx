import React, { useState } from "react"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import { Button, Form } from "react-bootstrap"
import "./ForgotPassword.scss"

export default function ForgotPassword(): JSX.Element {
  const [loginValue, setLoginValue] = useState("")

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginValue(event.target.value)
  }

  const handleConfirmClick = (event: MouseFormEvent): void => {
    event.preventDefault()

    if (loginValue.includes("@") && loginValue.includes(".")) {
      console.log(loginValue)

      setLoginValue("")
    }
  }

  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={loginValue}
            onChange={handleLoginChange}
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
