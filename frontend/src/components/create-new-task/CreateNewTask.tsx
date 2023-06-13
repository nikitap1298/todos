import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useTaskContext } from "../../context/TaskContext"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import "./CreateNewTask.scss"

export default function CreateNewTask(): JSX.Element {
  const { addNewTask } = useTaskContext()

  const [newTaskTitle, setNewTask] = useState("")

  const handleNewTaskInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTask(event.target.value)
  }

  const handleAddClick = (event: MouseFormEvent): void => {
    // Turn off the refresh of the page after user click 'enter' in form
    event.preventDefault()
    addNewTask(newTaskTitle)

    // Delete text from input
    setNewTask("")
  }

  return (
    <div className="create-new-task">
      <Form onSubmit={handleAddClick}>
        <Form.Control
          className="input"
          type="text"
          placeholder="Add some task"
          size="lg"
          value={newTaskTitle}
          onChange={handleNewTaskInputChange}
        />
        <Button className="confirm" variant="primary" onClick={handleAddClick}>
          Add
        </Button>
      </Form>
    </div>
  )
}
