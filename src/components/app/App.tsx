import React, { useEffect, useState } from "react"
import Header from "../header/Header"
import Task from "../task/Task"
import AlertComponent from "../alert/AlertComponent"
import CreateNewTask from "../create-new-task/CreateNewTask"
import { tasksArrayKey } from "../../constants/constants"

const TaskContext = React.createContext({
  task: "",
  onDelete: (_index: number) => {},
  arrayIndex: 0,
})
const AlertContext = React.createContext({ title: "", message: "" })
const CreateNewTaskContext = React.createContext({
  addNewTask: (_newTask: string) => {},
})

const App = () => {
  const [tasksArray, setTasksArray] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  // Load tasksArray from localStorage
  useEffect(() => {
    const tasksArrayLocalStorage = JSON.parse(
      localStorage.getItem(tasksArrayKey)
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
        tasksArrayKey,
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
    localStorage.setItem(tasksArrayKey, JSON.stringify([...newTasksArray]))
  }

  const renderTaskComponent = tasksArray.map((task) => (
    <TaskContext.Provider
      key={task}
      value={{
        task: task,
        onDelete: deleteTask,
        arrayIndex: tasksArray.indexOf(task),
      }}
    >
      <Task />
    </TaskContext.Provider>
  ))

  return (
    <div className="app">
      <div style={{ width: "45%" }}>
        <Header />
        {renderTaskComponent}
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
        <CreateNewTaskContext.Provider value={{ addNewTask }}>
          <CreateNewTask />
        </CreateNewTaskContext.Provider>
      </div>
    </div>
  )
}

export { App, TaskContext, AlertContext, CreateNewTaskContext }
