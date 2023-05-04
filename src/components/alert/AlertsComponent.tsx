import React from "react"
import { useAlertContext } from "../../context/AlertContext"
import AlertComponent from "./AlertComponent"
import { v4 as uuid } from 'uuid';

const AlertsComponent = () => {
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

export default AlertsComponent
