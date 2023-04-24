import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap"
import Task from "./Task"
import AlertComponent from "./AlertComponent"

const CreateNewTask = () => {
  const [tasksArray, setTasksArray] = useState([])
  const [newTaskName, setNewTaskName] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const handleNewTaskInputChange = (event) => {
    setNewTaskName(event.target.value)
  }

  const addNewTask = (event) => {
    // Turn off the refresh of the page after user click 'enter' in form
    event.preventDefault()

    const capitalizedMessage =
      newTaskName.charAt(0).toUpperCase() + newTaskName.slice(1)

    // User can't add the same task
    if (!tasksArray.includes(capitalizedMessage) && capitalizedMessage !== "") {
      setTasksArray((oldArray) => [...oldArray, capitalizedMessage])
      setShowAlert(false)
    } else if (tasksArray.includes(capitalizedMessage)) {
      setAlertMessage(capitalizedMessage)
      setShowAlert(true)
    }

    // Delete text from input
    setNewTaskName("")
  }

  const deleteTask = (index) => {
    const newTasksArray = [...tasksArray]
    newTasksArray.splice(index, 1)
    setTasksArray(newTasksArray)
  }

  const renderTaskComponent = tasksArray.map((task) => (
    <Task
      key={task}
      arrayIndex={tasksArray.indexOf(task)}
      task={task}
      onDelete={deleteTask}
    />
  ))

  useEffect(() => {
    localStorage.setItem("dataKey", JSON.stringify(tasksArray))
    const localStorageElement = JSON.parse(localStorage.getItem("dataKey"))
    console.log(localStorageElement)
  }, [tasksArray])

  return (
    <>
      {renderTaskComponent}
      {showAlert ? (
        <AlertComponent
          title="This task already exists:"
          message={alertMessage}
        />
      ) : null}
      <div className="create-new-task-div">
        <Form className="create-new-task-form" onSubmit={addNewTask}>
          <Form.Control
            type="text"
            placeholder="Add some task"
            size="lg"
            value={newTaskName}
            onChange={handleNewTaskInputChange}
          />
          <Button variant="secondary" size="lg" onClick={addNewTask}>
            Add
          </Button>
        </Form>
      </div>
    </>
  )
}

export default CreateNewTask
