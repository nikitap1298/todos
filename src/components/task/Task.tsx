import React from "react"
import { Form } from "react-bootstrap"
import { TaskContext } from "../app/App"
import "./Task.scss"

const Task = () => {
  const { task, onDelete, arrayIndex } = React.useContext(TaskContext)

  return (
    <div className="task">
      <div>
        <h1>{task}</h1>
        <Form>
          <Form.Check
            type="checkbox"
            label=""
            onChange={() => onDelete(arrayIndex)}
          />
        </Form>
      </div>
      <hr></hr>
    </div>
  )
}

export default Task
