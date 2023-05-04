import React from "react"
import { Form } from "react-bootstrap"
import { TaskInterface } from "../../lib/interfaces/task.interface"
import "./Task.scss"

interface TaskProps {
  className: string
  task: TaskInterface
  onComplete: (index: number) => void
  taskIndex: number
}

export default function Task(props: TaskProps): JSX.Element {
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
              onChange={(): void => onComplete(taskIndex)}
            />
          </Form>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
