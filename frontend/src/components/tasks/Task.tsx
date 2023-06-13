import React, { useState, useRef, useEffect } from "react"
import { Form } from "react-bootstrap"
import { TaskInterface } from "../../lib/interfaces/task.interface"
import "./Task.scss"
import dayjs from "dayjs"

interface TaskProps {
  className: string
  task: TaskInterface
  onEdit: (taskId: string | undefined, updatedTaskTitle: string) => void
  onComplete: (taskId: string | undefined) => void
  taskId: string | undefined
}

export default function Task(props: TaskProps): JSX.Element {
  const { className, task, onEdit, onComplete, taskId } = props

  const [editedValue, setEditedValue] = useState("")
  const [showTitleEditor, setShowTitleEditor] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setEditedValue(task.title)
    if (showTitleEditor && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showTitleEditor, task.title])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Escape") {
      event.currentTarget.value = ""
      event.currentTarget.blur()
      setShowTitleEditor(false)
    } else if (event.key === "Enter") {
      onEdit(taskId, editedValue)
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

  // Replace input with h1 when user pressed any place on the screen
  const handleBlur = (): void => {
    setShowTitleEditor(false)
  }

  return (
    <div className={className}>
      <div>
        <form>
          {!showTitleEditor ? (
            <h1 onClick={handleTriggerInputClick}>{task.title}</h1>
          ) : (
            <input
              className="inline-edit"
              type="text"
              value={editedValue}
              placeholder={task.title}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              onBlur={handleBlur}
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
            <Form.Check type="checkbox" label="" onChange={(): void => onComplete(taskId)} />
          </Form>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
