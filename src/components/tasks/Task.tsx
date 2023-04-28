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
  className: string
  task: TaskInterface
  onComplete: (index: number) => void
  taskIndex: number
}

const Task = (props: TaskProps) => {
  const { className, task, onComplete, taskIndex } = props

  return (
    <div className={className}>
      <div>
        <h1>{task.title}</h1>
        <div>
          <p>{task.finished ? task.finishedAt : task.createdAt}</p>
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
