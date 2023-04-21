import React, { useState } from "react"
import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap"
import Task from "./Task"
import AlertComponent from "./AlertComponent"

const CreateNewTask: React.FC = () => {
  const [tasksArray, setTasksArray] = useState([])
  const [message, setMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  const didPressAddButton = (event) => {
    // Turn off the refresh of the page after user click 'enter' in form
    event.preventDefault()
    
    const capitalizeMessage = message.charAt(0).toUpperCase() + message.slice(1)

    // User can't add the same task
    if (!tasksArray.includes(capitalizeMessage) && capitalizeMessage !== "") {
      setTasksArray((oldArray) => [...oldArray, capitalizeMessage])
      setShowAlert(false)
    } else if (tasksArray.includes(capitalizeMessage)) {
      setShowAlert(true)
    }

    // Delete text from input
    setMessage("")
  }

  const didPressCheckbox = (index) => {
    // console.log(`index: ${index}`)
    // console.log(`tasksArray: ${tasksArray}`)

    const newTasksArray = [...tasksArray]
    newTasksArray.splice(index, 1)
    setTasksArray(newTasksArray)
  }

  const renderTaskComponent = tasksArray.map((task) => (
    <Task
      key={task}
      arrayIndex={tasksArray.indexOf(task)}
      content={task}
      onDelete={didPressCheckbox}
    />
  ))

  return (
    <>
      {renderTaskComponent}
      {showAlert ? <AlertComponent /> : null}
      <div className="create-new-task-div">
        <Form className="create-new-task-form" onSubmit={didPressAddButton}>
          <Form.Control
            type="text"
            placeholder="Add some task"
            size="lg"
            value={message}
            onChange={handleChange}
          />
          <Button variant="secondary" size="lg" onClick={didPressAddButton}>
            Add
          </Button>{" "}
        </Form>
      </div>
    </>
  )
}

export default CreateNewTask
