import React, { useContext, useEffect, useState } from "react"
import { localStorageTasksKey } from "../constants/constants"

const TaskContext = React.createContext({
  tasks: [],
  addNewTask: (newTask: string) => {},
  deleteTask: (index: number) => {},
})

export const TaskContextProvider = ({ children }: any) => {
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
    if (!tasks.includes(capitalizedMessage) && capitalizedMessage !== "") {
      setTasks((oldArray) => [...oldArray, capitalizedMessage])
      //   setShowAlert(false)
      localStorage.setItem(
        localStorageTasksKey,
        JSON.stringify([...tasks, capitalizedMessage])
      )
    } else if (tasks.includes(capitalizedMessage)) {
      //   setAlertMessage(capitalizedMessage)
      //   setShowAlert(true)
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
