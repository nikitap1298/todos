import React from "react"
import { Form } from "react-bootstrap"

const Task = (task) => {
  return (
    <div className="task-div">
      <div className="task-child-div">
        <h1>{task.content}</h1>
        <Form>
          <Form.Check type="checkbox" label="" />
        </Form>
      </div>
      <hr></hr>
    </div>
  )
}

export default Task
