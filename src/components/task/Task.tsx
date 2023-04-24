import React from "react"
import { Form } from "react-bootstrap"

const Task = ({ task, onDelete, arrayIndex }) => {
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
