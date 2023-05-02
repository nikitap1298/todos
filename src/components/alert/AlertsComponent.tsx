import React from "react"
import { useAlertContext } from "../../context/AlertContext"
import AlertComponent from "./AlertComponent"

const AlertsComponent = () => {
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

export default AlertsComponent
