import React, { useContext, useEffect, useState } from "react"
import {
  localStorageTasksKey,
  localStorageShowCompletedTasksKey,
} from "../constants/constants"
import { useAlertContext } from "./AlertContext"
import { TaskInterface } from "../lib/interfaces/task.interface"

const TaskContext = React.createContext({
  tasks: [{}],
  addNewTask: (newTask: string): void => void {},
  completeTask: (index: number): void => void {},
  showCompletedTasks: true,
  showOrHideCompletedTasks: (): void => void {},
  deleteCompletedTasks: (): void => void {},
})

export const TaskContextProvider = ({ children }: any) => {
  const { alerts, addAlert, deleteAllAlerts } = useAlertContext()
  const [tasks, setTasks] = useState<TaskInterface[]>([])
  const [showCompletedTasks, setShowCompletedTasks] = useState(true)

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
    const tasksArrayLocalStorage = localStorage.getItem(localStorageTasksKey)
    const showCompletedTasksLocalStorage = localStorage.getItem(
      localStorageShowCompletedTasksKey
    )
    if (typeof tasksArrayLocalStorage === "string") {
      setTasks(JSON.parse(tasksArrayLocalStorage))
    }
    if (typeof showCompletedTasksLocalStorage === "string") {
      setShowCompletedTasks(JSON.parse(showCompletedTasksLocalStorage))
    }
  }, [])

  const addNewTask = (newTask: string): void => {
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
      addAlert({
        title: "This task already exists:",
        message: capitalizedMessage,
      })
    }
  }

  const completeTask = (index: number): void => {
    const newTasks: TaskInterface[] = [...tasks]

    // Toggle "finished" value
    newTasks[index].finished = !newTasks[index].finished
    if (newTasks[index].finished) {
      newTasks[index].finishedAt = formattedDate
      setTasks([...newTasks])
    }
    localStorage.setItem(localStorageTasksKey, JSON.stringify([...newTasks]))
  }

  const showOrHideCompletedTasks = (): void => {
    setShowCompletedTasks(!showCompletedTasks)
    localStorage.setItem(
      localStorageShowCompletedTasksKey,
      JSON.stringify(!showCompletedTasks)
    )
  }

  const deleteCompletedTasks = (): void => {
    const newTasks = tasks.filter((task) => task.finished !== true)
    setTasks([...newTasks])
    localStorage.setItem(localStorageTasksKey, JSON.stringify([...newTasks]))
  }

  // Filter or sort tasks
  const filteredTasks = showCompletedTasks
    ? tasks.sort((a, b) =>
        new Date(a.finishedAt) > new Date(b.finishedAt) ? 1 : -1
      )
    : tasks.filter((task) => !task.finished)
  tasks.sort((a, b) => (a.finished === b.finished ? 0 : a.finished ? 1 : -1))

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        addNewTask,
        completeTask,
        showCompletedTasks,
        showOrHideCompletedTasks,
        deleteCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = (): any => useContext(TaskContext) as any
