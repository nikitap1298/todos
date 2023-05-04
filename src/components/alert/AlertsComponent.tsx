import React from "react"
import { useAlertContext } from "../../context/AlertContext"
import AlertComponent from "./AlertComponent"
import { AlertInterface } from "../../lib/interfaces/alert.interface"
import { v4 as uuidv4 } from "uuid"

export default function AlertsComponent(): JSX.Element {
  const { alerts, deleteAlert } = useAlertContext()

  return (
    <div>
      {alerts.map((alert: AlertInterface, index: number) => (
        <AlertComponent
          key={uuidv4()}
          alert={alert}
          onDelete={deleteAlert}
          alertIndex={index}
        />
      ))}
    </div>
  )
}
