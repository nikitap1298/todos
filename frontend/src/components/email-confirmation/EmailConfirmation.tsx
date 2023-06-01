import React from "react"
import { useUserContext } from "../../context/UserContext"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import { useParams } from "react-router-dom"
import AlertsComponent from "../alert/AlertsComponent"
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
      <h1>Confirm your email</h1>
      <AlertsComponent />
      <button className="confirmation-button" type="submit" onClick={handleEmailConfirmClick}>
        Press to confirm
      </button>
    </div>
  )
}
