import React, { useContext, useEffect, useState } from "react"
import { localStorageShowCompletedTasksKey } from "../constants/constants"
import { useAlertContext } from "./AlertContext"
import {
  TaskContextInterface,
  TaskInterface,
} from "../lib/interfaces/task.interface"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { TaskService } from "../services/task-service"

const TaskContext = React.createContext<TaskContextInterface>({
  tasks: [],
  addNewTask: () => void {},
  completeTask: () => void {},
  showCompletedTasks: true,
  showOrHideCompletedTasks: () => void {},
  deleteCompletedTasks: () => void {},
})

export const TaskContextProvider = ({
  children,
}: ContextProviderProps): JSX.Element => {
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

  const tasksService = new TaskService()

  // Load tasksArray from localStorage
  useEffect(() => {
    tasksService
      .methodGET("/tasks")
      .then((data) => {
        setTasks(data)
      })
      .catch((error) => {
        throw new Error(error)
      })

    const showCompletedTasksLocalStorage = localStorage.getItem(
      localStorageShowCompletedTasksKey
    )
    if (typeof showCompletedTasksLocalStorage === "string") {
      setShowCompletedTasks(JSON.parse(showCompletedTasksLocalStorage))
    }
  }, [])

  const addNewTask = (newTaskTitle: string): void => {
    const capitalizedMessage =
      newTaskTitle.charAt(0).toUpperCase() + newTaskTitle.slice(1)

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
          finishedAt: "",
        },
      ])
      deleteAllAlerts()
      tasksService.methodPOST("/tasks", [
        ...tasks,
        {
          title: capitalizedMessage,
          createdAt: formattedDate,
          finished: false,
          finishedAt: "",
        },
      ])
    } else if (
      tasks.some((element) => element.title === capitalizedMessage) &&
      !alerts.some((element) => element.message === capitalizedMessage)
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
    tasksService.methodPUT("/tasks", [...newTasks])
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
    tasksService.methodPUT("/tasks", [...newTasks])
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

export const useTaskContext = (): TaskContextInterface =>
  useContext(TaskContext)
