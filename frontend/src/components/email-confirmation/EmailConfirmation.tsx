import React from "react"
import { useUserContext } from "../../context/UserContext"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import "./EmailConfirmation.scss"

export default function EmailConfirmation(): JSX.Element {
  const { confirmEmail } = useUserContext()
  const handleEmailConfirmClick = (event: MouseFormEvent): void => {
    event.preventDefault()
    confirmEmail()
  }
  return (
    <div className="email-confirmation">
      <h1>Confirm your email</h1>
      <button type="submit" onClick={handleEmailConfirmClick}>
        Press to confirm
      </button>
    </div>
  )
}
