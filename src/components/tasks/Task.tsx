import React from "react"
import { Form } from "react-bootstrap"
import "./Task.scss"

interface TaskInterface {
  title: string
  createdAt: string
  finished: boolean
  finishedAt: string
}

interface TaskProps {
  task: TaskInterface
  onComplete: (index: number) => void
  taskIndex: number
}

const Task = (props: TaskProps) => {
  const {task, onComplete, taskIndex } = props

  return (
    <div className="task">
      <div>
        <h1>{task.title}</h1>
        <div>
          <p>{task.createdAt}</p>
          <Form>
            <Form.Check
              type="checkbox"
              label=""
              onChange={() => onComplete(taskIndex)}
            />
          </Form>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}

export default Task
