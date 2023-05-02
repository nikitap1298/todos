import React, { useContext, useEffect, useState } from "react"
import {
  localStorageTasksKey,
  localStorageShowCompletedTasksKey,
} from "../constants/constants"
import { useAlertContext } from "./AlertContext"

const TaskContext = React.createContext({
  tasks: [],
  addNewTask: (newTask: string) => {},
  completeTask: (index: number) => {},
  showCompletedTasks: true,
  showOrHideCompletedTasks: () => {},
  deleteCompletedTasks: () => {},
})

export const TaskContextProvider = ({ children }: any) => {
  const { alerts, addAlert, deleteAllAlerts } = useAlertContext()
  let [tasks, setTasks] = useState([])
  let [showCompletedTasks, setShowCompletedTasks] = useState(true)

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
    const showCompletedTasksLocalStorage = JSON.parse(
      localStorage.getItem(localStorageShowCompletedTasksKey)
    )
    if (tasksArrayLocalStorage) {
      setTasks(tasksArrayLocalStorage)
    }
    setShowCompletedTasks(showCompletedTasksLocalStorage)
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
  }

  const showOrHideCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks)
    localStorage.setItem(
      localStorageShowCompletedTasksKey,
      JSON.stringify(!showCompletedTasks)
    )
  }

  const deleteCompletedTasks = () => {
    const newTasks = tasks.filter((task) => task.finished !== true)
    setTasks([...newTasks])
    localStorage.setItem(localStorageTasksKey, JSON.stringify([...newTasks]))
  }

  const filteredTasks = showCompletedTasks
    ? tasks.sort((a, b) =>
        new Date(a.finishedAt) > new Date(b.finishedAt) ? 1 : -1
      )
    : tasks.filter((task) => !task.finished)
  tasks = filteredTasks

  // Sort tasks by "finished" value
  // tasks.sort((a, b) =>
  //   new Date(a.finishedAt) > new Date(b.finishedAt) ? 1 : -1
  // )
  tasks.sort((a, b) => (a.finished === b.finished ? 0 : a.finished ? 1 : -1))

  return (
    <TaskContext.Provider
      value={{
        tasks,
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
