import React from "react"
import { Form } from "react-bootstrap"



interface TaskProps {
  task: string,
  taskIndex: number,
  onDelete: (index: number) => void,
}


const Task = (props: TaskProps) => {
  const { task, onDelete, taskIndex } = props;

  return (
    <div className="task">
      <div>
        <h1>{task}</h1>
        <Form>
          <Form.Check
            type="checkbox"
            label=""
            onChange={() => onDelete(taskIndex)}
          />
        </Form>
      </div>
      <hr></hr>
    </div>
  )
}

export default Task
