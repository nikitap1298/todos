import React, { useContext, useEffect, useState } from "react"
import { localStorageTasksKey } from "../constants/constants"
import { useAlertContext } from "./AlertContext"

const TaskContext = React.createContext({
  tasks: [],
  addNewTask: (newTask: string) => {},
  completeTask: (index: number) => {},
  deleteCompletedTasks: () => {},
})

export const TaskContextProvider = ({ children }: any) => {
  const { alerts, addAlert, deleteAllAlerts } = useAlertContext()
  let [tasks, setTasks] = useState([])

  const date = new Date()
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
  }
  const formatter = new Intl.DateTimeFormat("en-DE", options)
  const formattedDate = formatter.format(date).replace(" at", "")

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
      setTasks((oldArray) => [
        ...oldArray,
        {
          title: capitalizedMessage,
          createdAt: formattedDate,
          finished: false,
        },
      ])
      deleteAllAlerts()
      localStorage.setItem(
        localStorageTasksKey,
        JSON.stringify([
          ...tasks,
          {
            title: capitalizedMessage,
            createdAt: formattedDate,
            finished: false,
          },
        ])
      )
    } else if (
      tasks.some((element) => element.title === capitalizedMessage) &&
      !alerts.includes(capitalizedMessage)
    ) {
      addAlert(capitalizedMessage)
    }
  }

  const completeTask = (index: number) => {
    const newTasks = [...tasks]

    // Toggle "finished" value
    newTasks[index].finished = !newTasks[index].finished
    if (newTasks[index].finished) {
      newTasks[index].finishedAt = formattedDate
      setTasks([...newTasks])
    }
    localStorage.setItem(localStorageTasksKey, JSON.stringify([...newTasks]))

    // newTasks.splice(index, 1)
    // setTasks(newTasks)
  }

  const deleteCompletedTasks = () => {
    const newTasks = tasks.filter((task) => task.finished !== true)
    setTasks([...newTasks])
    localStorage.setItem(localStorageTasksKey, JSON.stringify([...newTasks]))
  }

  // Sort tasks by "finished" value
  tasks.sort((a, b) =>
    new Date(a.finishedAt) > new Date(b.finishedAt) ? 1 : -1
  )
  tasks.sort((a, b) => (a.finished === b.finished ? 0 : a.finished ? 1 : -1))

  return (
    <TaskContext.Provider
      value={{ tasks, addNewTask, completeTask, deleteCompletedTasks }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = (): any => useContext(TaskContext) as any
