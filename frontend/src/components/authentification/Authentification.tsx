import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useUserContext } from "../../context/UserContext"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import AlertsComponent from "../alert/AlertsComponent"
import { useAlertContext } from "../../context/AlertContext"
import { useNavigate } from "react-router-dom"
import "./Authentification.scss"

export default function Authentification(): JSX.Element {
  const { addAlert, deleteAllAlerts } = useAlertContext()
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
        addAlert({
          title: "Password is not safe",
          message: "Password must be longer than 6 characters",
        })
      } else {
        registerUser(login, password)
        setLoginPlaceholder("Enter email")
        setPasswordPlaceholdert("Password")
        deleteAllAlerts()
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
    console.log(`Forgot Password Click. Email: ${login}`)
  }

  return (
    <div className="authentification">
      {registerComponentIsActive ? (
        <>
          <h1>Registration</h1>
          <AlertsComponent />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={loginPlaceholder}
                value={login}
                onChange={handleLoginInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder={passwordPlaceholder}
                value={password}
                onChange={handlePasswordInputChange}
              />
            </Form.Group>
            <Button
              className="authentification-button"
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
          <h1>Log In</h1>
          <AlertsComponent />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={loginPlaceholder}
                value={login}
                onChange={handleLoginInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder={passwordPlaceholder}
                value={password}
                onChange={handlePasswordInputChange}
              />
            </Form.Group>
            <div className="login-buttons">
              <Button
                className="authentification-button"
                variant="primary"
                type="submit"
                onClick={handleLogInClick}
              >
                Log In
              </Button>
              <div>
                <button type="submit" onClick={handleDontHaveAccountClick}>
                  Don't have an account?
                </button>
                <button type="submit" onClick={handleForgotPasswordClick}>
                  Forgot your password?
                </button>
              </div>
            </div>
          </Form>
        </>
      )}
    </div>
  )
}
