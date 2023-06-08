import React, { useEffect, useRef, useState } from "react"
import { ListInterface } from "../../lib/interfaces/list.interface"
import "./List.scss"

interface ListProps {
  className: string
  list: ListInterface
  onSelect: (listId: string) => void
  onEdit: (listId: string, updatedTitle: string) => void
  onDelete: (listId: string) => void
  listId: string | undefined
}

export default function List(props: ListProps): JSX.Element {
  const { className, list, onSelect, onEdit, onDelete, listId } = props

  const [editedValue, setEditedValue] = useState("")
  const [showListEditor, setShowListEditor] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setEditedValue(list.title)
    if (showListEditor && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showListEditor, list.title])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Escape") {
      event.currentTarget.value = ""
      event.currentTarget.blur()
      setShowListEditor(false)
    } else if (event.key === "Enter") {
      onEdit(listId as string, editedValue)
      event.preventDefault()
      setShowListEditor(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedValue(event.target.value)
  }

  // Replace input with h1 when user pressed any place on the screen
  const handleBlur = (): void => {
    setShowListEditor(false)
  }

  const handleEditClick = (): void => {
    setShowListEditor(true)
  }

  return (
    <div className={className}>
      {!showListEditor ? (
        <h1 onClick={(): void => onSelect(listId as string)}>{list.title}</h1>
      ) : (
        <input
          className="task-editable-input"
          type="text"
          value={editedValue}
          placeholder={list.title}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={inputRef}
        />
      )}
      <div>
        <button className="edit-btn" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete-btn" onClick={(): void => onDelete(listId as string)}>
          Delete
        </button>
      </div>
    </div>
  )
}
