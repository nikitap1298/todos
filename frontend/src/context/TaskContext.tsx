/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { localStorageAccessToken, localStorageShowCompletedTasksKey } from "../constants/constants"
import { useAlertContext } from "./AlertContext"
import { TaskInterface } from "../lib/interfaces/task.interface"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { TasksService } from "../services/tasks-service"
import { useListContext } from "./ListContext"
import { APIService } from "../services/api-service"

interface TaskContextInterface {
  tasks: TaskInterface[]
  addNewTask: (newTaskTitle: string) => void
  updateTask: (taskId: string | undefined, updatedTitle: string) => void
  completeTask: (taskId: string | undefined) => void
  showCompletedTasks: boolean
  showOrHideCompletedTasks: () => void
  deleteCompletedTasks: () => void
}

const TaskContext = React.createContext<TaskContextInterface>({
  tasks: [],
  addNewTask: () => void {},
  updateTask: () => void {},
  completeTask: () => void {},
  showCompletedTasks: true,
  showOrHideCompletedTasks: () => void {},
  deleteCompletedTasks: () => void {},
})

export const TaskContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  const { alerts, addAlert, deleteAllAlerts } = useAlertContext()
  const { lists, selectedListId } = useListContext()
  const [tasks, setTasks] = useState<TaskInterface[]>([])
  const [showCompletedTasks, setShowCompletedTasks] = useState(true)

  const tasksService = new TasksService()
  const accessTokenLocalStorage = localStorage.getItem(localStorageAccessToken)
  if (accessTokenLocalStorage) {
    tasksService.setAuthorizationToken(`Bearer ${JSON.parse(accessTokenLocalStorage)}`)
  }

  // Load tasksArray from localStorage
  useEffect(() => {
    fetchTasksFromDB()

    const showCompletedTasksLocalStorage = localStorage.getItem(localStorageShowCompletedTasksKey)
    if (typeof showCompletedTasksLocalStorage === "string") {
      setShowCompletedTasks(JSON.parse(showCompletedTasksLocalStorage))
    }
  }, [])

  // Find selectedList
  const selectedList = lists.find((element) => element._id === selectedListId)
  console.log(`Using list: ${selectedList?.title}`)

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
    const capitalizedMessage = newTaskTitle.charAt(0).toUpperCase() + newTaskTitle.slice(1).trim()

    // User can't add the same task, empty task or task if there are no lists
    if (
      !tasks.some((element) => element.title === capitalizedMessage) &&
      capitalizedMessage !== "" &&
      selectedList
    ) {
      tasksService
        .addTask({
          listId: selectedList?._id,
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
    } else if (!selectedList) {
      addAlert({
        title: "List is not selected",
        message: "Select or add new list",
      })
    }
  }

  const updateTask = (taskId: string | undefined, updatedTaskTitle: string): void => {
    const newTasks: TaskInterface[] = [...tasks]
    const newTaskTitle = updatedTaskTitle.charAt(0).toUpperCase() + updatedTaskTitle.slice(1).trim()

    const updatedTask = newTasks.find(
      (element: TaskInterface) => element._id === taskId
    ) as TaskInterface

    updatedTask.title = newTaskTitle
    tasksService
      .updateTask(updatedTask)
      .then(() => {
        deleteAllAlerts()
        setTasks([...newTasks])
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const completeTask = (taskId: string | undefined): void => {
    const newTasks: TaskInterface[] = [...tasks]
    const completedTask = newTasks.find(
      (element: TaskInterface) => element._id === taskId
    ) as TaskInterface

    // Toggle "finished" value
    completedTask.finished = !completedTask.finished
    if (completedTask.finished) {
      completedTask.finishedAt = new Date()
      tasksService
        .updateTask(completedTask)
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
    localStorage.setItem(localStorageShowCompletedTasksKey, JSON.stringify(!showCompletedTasks))
  }

  const deleteCompletedTasks = async (): Promise<void> => {
    const oldTasks = tasks
    const newTasks = tasks.filter((task) => task.finished !== true)
    const deletedTasks = oldTasks
      .filter((obj1) => !newTasks.some((obj2) => obj1._id === obj2._id))
      .filter((element) => element.listId === selectedList?._id)

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
  const filteredTasks = showCompletedTasks ? tasks : tasks.filter((task) => !task.finished)
  const finalFilteredTasks = filteredTasks.filter((element) => element.listId === selectedList?._id)
  tasks.sort((a, b) => (a.finished === b.finished ? 0 : a.finished ? 1 : -1))

  return (
    <TaskContext.Provider
      value={{
        tasks: finalFilteredTasks,
        addNewTask,
        updateTask,
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

export const useTaskContext = (): TaskContextInterface => useContext(TaskContext)
