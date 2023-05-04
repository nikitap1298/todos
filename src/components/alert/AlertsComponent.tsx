import React from "react"
import { useAlertContext } from "../../context/AlertContext"
import AlertComponent from "./AlertComponent"
import { uuid } from "uuidv4"

export default function AlertsComponent(): JSX.Element {
  const { alerts, deleteAlert } = useAlertContext()

  return (
    <div>
      {alerts.map((alert, index) => (
        <AlertComponent
          key={uuid()}
          alert={alert}
          onDelete={deleteAlert}
          alertIndex={index}
        />
      ))}
    </div>
  )
}
