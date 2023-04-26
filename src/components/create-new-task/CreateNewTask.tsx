import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useTaskContext } from "../../context/TaskContext"
import "./CreateNewTask.scss"

const CreateNewTask = () => {
  const { addNewTask } = useTaskContext()

  let [newTask, setNewTask] = useState("")

  const handleNewTaskInputChange = (event) => {
    setNewTask(event.target.value)
  }

  const handleAddClick = (event) => {
    // Turn off the refresh of the page after user click 'enter' in form
    event.preventDefault()
    addNewTask(newTask)

    // Delete text from input
    setNewTask("")
  }

  return (
    <div className="create-new-task">
      <Form onSubmit={handleAddClick}>
        <Form.Control
          type="text"
          placeholder="Add some task"
          size="lg"
          value={newTask}
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
