import React from "react"
import { Form } from "react-bootstrap"

const Task = (props) => {
  const handleClick = () => {
    props.onDelete(props.arrayIndex)
  }

  return (
    <div className="task-div">
      <div className="task-child-div">
        <h1>{props.content}</h1>
        <Form>
          <Form.Check type="checkbox" label="" onChange={handleClick} />
        </Form>
      </div>
      <hr></hr>
    </div>
  )
}

export default Task
