import React from "react"
import { Form } from "react-bootstrap"
import { TaskContext } from "../app/App"

const Task = () => {
  const task = React.useContext(TaskContext).task
  const onDelete = React.useContext(TaskContext).onDelete
  const arrayIndex = React.useContext(TaskContext).arrayIndex

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
