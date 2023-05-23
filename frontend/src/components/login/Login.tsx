import React from "react"
import { Button, Form } from "react-bootstrap"
import { useUserContext } from "../../context/UserContext"

export default function Login(): JSX.Element {
  const { addNewUser } = useUserContext()

  // addNewUser("konstantin", "123")

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
