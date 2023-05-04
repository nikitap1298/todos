import React from "react"
import { useAlertContext } from "../../context/AlertContext"
import AlertComponent from "./AlertComponent"
// import { v4 as uuid } from "uuid"

export default function AlertsComponent(): JSX.Element {
  const { alerts, deleteAlert } = useAlertContext()

  return (
    <div>
      {alerts.map((alert, index) => (
        <AlertComponent
          key={Math.random()}
          alert={alert}
          onDelete={deleteAlert}
          alertIndex={index}
        />
      ))}
    </div>
  )
}
