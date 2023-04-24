import React, { useEffect, useState } from "react"
import Header from "../header/Header"
import Task from "../task/Task"
import AlertComponent from "../alert/AlertComponent"
import CreateNewTask from "../create-new-task/CreateNewTask"
import { tasksArrayKey } from "../../constants/constants"

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
    console.log(newTaskName)

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
    <Task
      key={task}
      arrayIndex={tasksArray.indexOf(task)}
      task={task}
      onDelete={deleteTask}
    />
  ))

  return (
    <div className="app">
      <div style={{ width: "45%" }}>
        <Header />
        {renderTaskComponent}
        {showAlert ? (
          <AlertComponent
            title="This task already exists:"
            message={alertMessage}
          />
        ) : null}
        <CreateNewTask addNewTask={addNewTask} />
      </div>
    </div>
  )
}

export default App
