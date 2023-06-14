import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useUserContext } from "../../context/UserContext"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import ToastsComponent from "../toast/ToastsComponent"
import { useToastContext } from "../../context/ToastContext"
import { useNavigate } from "react-router-dom"
import "./Authentification.scss"

export default function Authentification(): JSX.Element {
  const { addToast, deleteAllToasts } = useToastContext()
  const { logIn, registerUser } = useUserContext()

  const [login, setLogin] = useState("")
  const [loginPlaceholder, setLoginPlaceholder] = useState("Enter email")
  const [password, setPassword] = useState("")
  const [passwordPlaceholder, setPasswordPlaceholdert] = useState("Password")

  const [registerComponentIsActive, setRegisterComponentIsActive] = useState(false)

  const navigate = useNavigate()

  const handleLoginInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin(event.target.value)
  }

  const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleRegisterClick = (event: MouseFormEvent): void => {
    event.preventDefault()

    if (login.includes("@") && login.includes(".") && password !== "") {
      if (password.length < 6) {
        addToast({
          variant: "warning",
          message: "Password must be longer than 6 characters",
          isGlobal: false,
        })
      } else {
        registerUser(login, password)
        setLoginPlaceholder("Enter email")
        setPasswordPlaceholdert("Password")
        deleteAllToasts()
      }
    }

    setLogin("")
    setPassword("")
  }

  const handleLogInClick = (event: MouseFormEvent): void => {
    event.preventDefault()

    logIn(login, password)

    setLogin("")
    setPassword("")
  }

  const handleDontHaveAccountClick = (event: MouseFormEvent): void => {
    event.preventDefault()
    setRegisterComponentIsActive(true)
  }

  const handleForgotPasswordClick = (event: MouseFormEvent): void => {
    event.preventDefault()
    navigate("/password/reset")
  }

  return (
    <div className="authentification">
      {registerComponentIsActive ? (
        <>
          <h1 className="header">Registration</h1>
          <ToastsComponent />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="input"
                type="email"
                placeholder={loginPlaceholder}
                value={login}
                onChange={handleLoginInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="input"
                type="password"
                placeholder={passwordPlaceholder}
                value={password}
                onChange={handlePasswordInputChange}
              />
            </Form.Group>
            <Button
              className="authentification-button confirm"
              variant="primary"
              type="submit"
              onClick={handleRegisterClick}
            >
              Register
            </Button>
          </Form>
        </>
      ) : (
        <>
          <h1 className="header">Log In</h1>
          <ToastsComponent />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="input"
                type="email"
                placeholder={loginPlaceholder}
                value={login}
                onChange={handleLoginInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="input"
                type="password"
                placeholder={passwordPlaceholder}
                value={password}
                onChange={handlePasswordInputChange}
              />
            </Form.Group>
            <div className="login-buttons">
              <Button
                className="authentification-button confirm"
                variant="primary"
                type="submit"
                onClick={handleLogInClick}
              >
                Log In
              </Button>
              <div>
                <Button
                  className="confirm-no-bg"
                  variant="light"
                  type="submit"
                  onClick={handleDontHaveAccountClick}
                >
                  Don't have an account?
                </Button>
                <Button
                  className="confirm-no-bg"
                  variant="light"
                  type="submit"
                  onClick={handleForgotPasswordClick}
                >
                  Forgot your password?
                </Button>
              </div>
            </div>
          </Form>
        </>
      )}
    </div>
  )
}
