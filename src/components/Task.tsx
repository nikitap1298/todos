import React, { useState } from "react"
import { Form } from "react-bootstrap"

const Task = (task) => {
  const handleClick = () => {
    task.onDelete(task.arrayIndex)
  }

  return (
    <div className="task-div">
      <div className="task-child-div">
        <h1>{task.content}</h1>
        <Form>
          <Form.Check type="checkbox" label="" onChange={handleClick} />
        </Form>
      </div>
      <hr></hr>
    </div>
  )
}

export default Task
