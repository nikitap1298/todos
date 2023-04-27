import React, { useContext, useEffect, useState } from "react"
import { localStorageTasksKey } from "../constants/constants"
import { useAlertContext } from "./AlertContext"

const TaskContext = React.createContext({
  tasks: [],
  addNewTask: (newTask: string) => {},
  deleteTask: (index: number) => {},
})

export const TaskContextProvider = ({ children }: any) => {
  const { alerts, addAlert, deleteAllAlerts } = useAlertContext()
  let [tasks, setTasks] = useState([])

  // Load tasksArray from localStorage
  useEffect(() => {
    const tasksArrayLocalStorage = JSON.parse(
      localStorage.getItem(localStorageTasksKey)
    )
    if (tasksArrayLocalStorage) {
      setTasks(tasksArrayLocalStorage)
    }
  }, [])

  const addNewTask = (newTask: string) => {
    const capitalizedMessage =
      newTask.charAt(0).toUpperCase() + newTask.slice(1)

    // User can't add the same task
    if (
      !tasks.some((element) => element.title === capitalizedMessage) &&
      capitalizedMessage !== ""
    ) {
      setTasks((oldArray) => [...oldArray, { title: capitalizedMessage }])
      deleteAllAlerts()
      localStorage.setItem(
        localStorageTasksKey,
        JSON.stringify([...tasks, { title: capitalizedMessage }])
      )
    } else if (
      tasks.some((element) => element.title === capitalizedMessage) &&
      !alerts.includes(capitalizedMessage)
    ) {
      addAlert(capitalizedMessage)
    }
  }

  const deleteTask = (index: number) => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
    localStorage.setItem(localStorageTasksKey, JSON.stringify([...newTasks]))
  }

  return (
    <TaskContext.Provider value={{ tasks, addNewTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = (): any => useContext(TaskContext) as any
