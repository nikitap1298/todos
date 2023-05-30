import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useUserContext } from "../../context/UserContext"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import "./Authentification.scss"
import AlertsComponent from "../alert/AlertsComponent"

export default function Authentification(): JSX.Element {
  const { logIn, registerUser } = useUserContext()

  const [login, setLogin] = useState("")
  const [loginPlaceholder, setLoginPlaceholder] = useState("Enter email")
  const [password, setPassword] = useState("")
  const [passwordPlaceholder, setPasswordPlaceholdert] = useState("Password")

  const [registerComponentIsActive, setRegisterComponentIsActive] = useState(false)

  const handleLoginInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin(event.target.value)
  }

  const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleRegisterClick = (event: MouseFormEvent): void => {
    event.preventDefault()

    if (login.includes("@") && login.includes(".") && password !== "") {
      registerUser(login, password)
      setLoginPlaceholder("Enter email")
      setPasswordPlaceholdert("Password")
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
              <button
                className="dont-have-account"
                type="submit"
                onClick={handleDontHaveAccountClick}
              >
                Don't have an account?
              </button>
            </div>
          </Form>
        </>
      )}
    </div>
  )
}
