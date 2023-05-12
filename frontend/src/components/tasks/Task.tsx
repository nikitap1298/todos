import React, { useState, useRef, useEffect } from "react"
import { Form } from "react-bootstrap"
import { TaskInterface } from "../../lib/interfaces/task.interface"
import "./Task.scss"
import dayjs from "dayjs"

interface TaskProps {
  className: string
  task: TaskInterface
  onEdit: (index: number, updatedTaskTitle: string) => void
  onComplete: (index: number) => void
  taskIndex: number
}

export default function Task(props: TaskProps): JSX.Element {
  const { className, task, onEdit, onComplete, taskIndex } = props

  const [editedValue, setEditedValue] = useState("")
  const [showTitleEditor, setShowTitleEditor] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showTitleEditor && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showTitleEditor])

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Escape") {
      event.currentTarget.value = ""
      event.currentTarget.blur()
      setShowTitleEditor(false)
    } else if (event.key === "Enter") {
      onEdit(taskIndex, editedValue)
      event.preventDefault()
      setShowTitleEditor(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedValue(event.target.value)
  }

  const handleTriggerInputClick = (): void => {
    if (!task.finished) {
      setShowTitleEditor(true)
    }
  }

  return (
    <div className={className}>
      <div>
        <form>
          {!showTitleEditor ? (
            <h1 onClick={handleTriggerInputClick}>{task.title}</h1>
          ) : (
            <input
              className="task-editable-input"
              type="text"
              placeholder={task.title}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              ref={inputRef}
            />
          )}
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
