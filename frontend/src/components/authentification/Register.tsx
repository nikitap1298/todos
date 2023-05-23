import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useUserContext } from "../../context/UserContext"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"

export default function Register(): JSX.Element {
  const { users, addNewUser } = useUserContext()

  const [login, setLogin] = useState("")
  const [loginPlaceholder, setLoginPlaceholder] = useState("Enter username")
  const [password, setPassword] = useState("")
  const [passwordPlaceholder, setPasswordPlaceholdert] = useState("Password")

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
      setPasswordPlaceholdert("Password")
    } else if (password.length < 6) {
      setLoginPlaceholder("Enter username")
      setPasswordPlaceholdert("Password non-secure")
    } else if (login !== "" && password !== "") {
      addNewUser(login, password)
      setLoginPlaceholder("Enter username")
      setPasswordPlaceholdert("Password")
    }

    setLogin("")
    setPassword("")
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
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
      <Button variant="primary" type="submit" onClick={handleRegisterClick}>
        Register
      </Button>
    </Form>
  )
}
