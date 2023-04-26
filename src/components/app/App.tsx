import React, { useEffect, useState } from "react"
import Header from "../header/Header"
import Task from "../task/Task"
import AlertComponent from "../alert/AlertComponent"
import CreateNewTask from "../create-new-task/CreateNewTask"
import { localStorageTasksKey } from "../../constants/constants"
import "./App.scss"
import { TaskContextProvider } from "../../context/TaskContext"
import Tasks from "../task/Tasks"

const AlertContext = React.createContext({ title: "", message: "" })

const App = () => {
  const [tasksArray, setTasksArray] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  // Load tasksArray from localStorage
  useEffect(() => {
    const tasksArrayLocalStorage = JSON.parse(
      localStorage.getItem(localStorageTasksKey)
    )
    if (tasksArrayLocalStorage) {
      setTasksArray(tasksArrayLocalStorage)
    }
  }, [])

  const addNewTask = (newTaskName) => {
    const capitalizedMessage =
      newTaskName.charAt(0).toUpperCase() + newTaskName.slice(1)

    // User can't add the same task
    if (!tasksArray.includes(capitalizedMessage) && capitalizedMessage !== "") {
      setTasksArray((oldArray) => [...oldArray, capitalizedMessage])
      setShowAlert(false)
      localStorage.setItem(
        localStorageTasksKey,
        JSON.stringify([...tasksArray, capitalizedMessage])
      )
    } else if (tasksArray.includes(capitalizedMessage)) {
      setAlertMessage(capitalizedMessage)
      setShowAlert(true)
    }
  }

  const deleteTask = (index) => {
    const newTasksArray = [...tasksArray]
    newTasksArray.splice(index, 1)
    setTasksArray(newTasksArray)
    localStorage.setItem(localStorageTasksKey, JSON.stringify([...newTasksArray]))
  }


  return (
    <div className="app">
      <div style={{ width: "45%" }}>
        <Header />
        <TaskContextProvider>
          <Tasks/>
        {showAlert ? (
          <AlertContext.Provider
            value={{
              title: "This task already exists:",
              message: alertMessage,
            }}
          >
            <AlertComponent />
          </AlertContext.Provider>
        ) : null}
        {/* <CreateNewTaskContext.Provider value={{ addNewTask }}>
          <CreateNewTask />
        </CreateNewTaskContext.Provider> */}
        </TaskContextProvider>
      </div>
    </div>
  )
}

export { App, TaskContext, AlertContext, CreateNewTaskContext }
