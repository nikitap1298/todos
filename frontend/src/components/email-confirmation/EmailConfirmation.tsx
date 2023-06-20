import React from "react"
import { Button } from "react-bootstrap"
import { useUserContext } from "../../context/UserContext"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import { useParams } from "react-router-dom"
import Toasts from "../toast/Toasts"
import "./EmailConfirmation.scss"

export default function EmailConfirmation(): JSX.Element {
  const { id, token } = useParams()
  const { confirmEmail } = useUserContext()

  const handleEmailConfirmClick = (event: MouseFormEvent): void => {
    event.preventDefault()
    confirmEmail(id as string, token as string)
  }
  return (
    <div className="email-confirmation">
      <h1 className="header">Confirm your email</h1>
      <Toasts global={true}/>
      <Button className="confirm" variant="success" type="submit" onClick={handleEmailConfirmClick}>
        Press to confirm
      </Button>
    </div>
  )
}
