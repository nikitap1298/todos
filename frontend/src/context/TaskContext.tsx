/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { localStorageShowCompletedTasksKey } from "../constants/constants"
import { useAlertContext } from "./AlertContext"
import {
  TaskContextInterface,
  TaskInterface,
} from "../lib/interfaces/task.interface"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { TasksService } from "../services/tasks-service"

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

  const tasksService = new TasksService()

  // Load tasksArray from localStorage
  useEffect(() => {
    fetchTasksFromDB()

    const showCompletedTasksLocalStorage = localStorage.getItem(
      localStorageShowCompletedTasksKey
    )
    if (typeof showCompletedTasksLocalStorage === "string") {
      setShowCompletedTasks(JSON.parse(showCompletedTasksLocalStorage))
    }
  }, [])

  const fetchTasksFromDB = (): void => {
    tasksService
      .readTasks()
      .then((tasks) => {
        setTasks(tasks as TaskInterface[])
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const addNewTask = (newTaskTitle: string): void => {
    const capitalizedMessage =
      newTaskTitle.charAt(0).toUpperCase() + newTaskTitle.slice(1)

    // User can't add the same task
    if (
      !tasks.some((element) => element.title === capitalizedMessage) &&
      capitalizedMessage !== ""
    ) {
      tasksService
        .addTask({
          title: capitalizedMessage,
          createdAt: new Date(),
          finished: false,
        })
        .then((newTask) => {
          setTasks((oldArray) => [...oldArray, newTask])
          deleteAllAlerts()
        })
        .catch((error) => {
          throw new Error(error)
        })
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
      newTasks[index].finishedAt = new Date()
      tasksService
        .updateTask(newTasks[index])
        .then(() => {
          setTasks([...newTasks])
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }

  const showOrHideCompletedTasks = (): void => {
    setShowCompletedTasks(!showCompletedTasks)
    localStorage.setItem(
      localStorageShowCompletedTasksKey,
      JSON.stringify(!showCompletedTasks)
    )
  }

  const deleteCompletedTasks = async (): Promise<void> => {
    const oldTasks = tasks
    const newTasks = tasks.filter((task) => task.finished !== true)
    const deletedTasks = oldTasks.filter(
      (obj1) => !newTasks.some((obj2) => obj1._id === obj2._id)
    )

    for (const task of deletedTasks) {
      try {
        await tasksService.deleteTask(task).then(() => {
          newTasks.filter((element) => element._id !== task._id)
          setTasks([...newTasks])
        })
      } catch (error) {
        throw new Error(`Error during for loop: ${error}`)
      }
    }
  }

  // Filter or sort tasks
  const filteredTasks = showCompletedTasks
    ? tasks.sort((a, b) =>
        (a.finishedAt as Date) > (b.finishedAt as Date) ? 1 : -1
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
