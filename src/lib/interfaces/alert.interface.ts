export interface AlertInterface {
  title: string
  message: string
}

export interface AlertContextInterface {
  alerts: AlertInterface[]
  addAlert: (newAlert: AlertInterface) => void
  deleteAlert: (index: number) => void
  deleteAllAlerts: () => void
}
