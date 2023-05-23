import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useUserContext } from "../../context/UserContext"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import { localStorageUserInfoKey } from "../../constants/constants"
import "./Register.scss"

export default function Register(): JSX.Element {
  const { users, addNewUser } = useUserContext()

  const [login, setLogin] = useState("")
  const [loginPlaceholder, setLoginPlaceholder] = useState("Enter username")
  const [hasLoginError, setHasLoginError] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordPlaceholder, setPasswordPlaceholdert] = useState("Password")
  const [hasPasswordError, setHasPasswordError] = useState(false)

  const handleLoginInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin(event.target.value)
  }

  const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleRegisterClick = (event: MouseFormEvent): void => {
    event.preventDefault()

    if (users.some((user) => user.login === login)) {
      setLoginPlaceholder("Username unavailable")
      setHasLoginError(true)
      setPasswordPlaceholdert("Password")
      setHasPasswordError(false)
    } else if (password.length < 6) {
      setLoginPlaceholder("Enter username")
      setHasLoginError(false)
      setPasswordPlaceholdert("Password non-secure")
      setHasPasswordError(true)
    } else if (login !== "" && password !== "") {
      localStorage.setItem(localStorageUserInfoKey, JSON.stringify({ login, password }))
      addNewUser(login, password)
      setLoginPlaceholder("Enter username")
      setHasLoginError(false)
      setPasswordPlaceholdert("Password")
      setHasPasswordError(false)
    }

    setLogin("")
    setPassword("")
  }

  return (
    <div className="register">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            style={hasLoginError ? { borderColor: "red" } : { borderColor: "none" }}
            type="text"
            placeholder={loginPlaceholder}
            value={login}
            onChange={handleLoginInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            style={hasPasswordError ? { borderColor: "red" } : { borderColor: "none" }}
            type="password"
            placeholder={passwordPlaceholder}
            value={password}
            onChange={handlePasswordInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleRegisterClick}>
          Register
        </Button>
      </Form>
    </div>
  )
}