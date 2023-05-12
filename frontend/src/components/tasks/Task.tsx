import React from "react"
import { Form } from "react-bootstrap"
import { TaskInterface } from "../../lib/interfaces/task.interface"
import "./Task.scss"
import dayjs from "dayjs"

interface TaskProps {
  className: string
  task: TaskInterface
  onComplete: (index: number) => void
  taskIndex: number
}

export default function Task(props: TaskProps): JSX.Element {
  const { className, task, onComplete, taskIndex } = props

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Escape") {
      event.currentTarget.value = ""
      event.currentTarget.blur()
    }
  }

  return (
    <div className={className}>
      <div>
        <form>
          <input
            className="task-editable-input"
            type="text"
            placeholder={task.title}
            onKeyDown={handleKeyDown}
          />
        </form>
        <div>
          <p>
            {task.finished
              ? dayjs(task.finishedAt).format("D MMM H:mm")
              : dayjs(task.createdAt).format("D MMM H:mm")}
          </p>
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
