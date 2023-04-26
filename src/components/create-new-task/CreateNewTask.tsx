import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { CreateNewTaskContext } from "../app/App"

import "./CreateNewTask.scss"

const CreateNewTask = () => {
  const { addNewTask } = React.useContext(CreateNewTaskContext)

  const [newTaskName, setNewTaskName] = useState("")

  const handleNewTaskInputChange = (event) => {
    setNewTaskName(event.target.value)
  }

  const handleAddClick = (event) => {
    // Turn off the refresh of the page after user click 'enter' in form
    event.preventDefault()
    addNewTask(newTaskName)

    // Delete text from input
    setNewTaskName("")
  }

  return (
    <div className="create-new-task">
      <Form onSubmit={handleAddClick}>
        <Form.Control
          type="text"
          placeholder="Add some task"
          size="lg"
          value={newTaskName}
          onChange={handleNewTaskInputChange}
        />
        <Button variant="secondary" size="lg" onClick={handleAddClick}>
          Add
        </Button>
      </Form>
    </div>
  )
}

export default CreateNewTask
