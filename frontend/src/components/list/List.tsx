import React, { useEffect, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import { ListInterface } from "../../lib/interfaces/list.interface"
import ModalDelete from "../modal-delete/ModalDelete"
import { useModalDeleteContext } from "../../context/ModalDeleteContext"
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

  const { showModal } = useModalDeleteContext()

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

  const handleDeleteClick = (): void => {
    showModal()
  }

  return (
    <div className={className}>
      {!showListEditor ? (
        <h1 onClick={(): void => onSelect(listId as string)}>{list.title}</h1>
      ) : (
        <input
          className="inline-edit"
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
        <Button className="edit-btn confirm-no-bg " onClick={handleEditClick}>
          Edit
        </Button>
        <Button className="delete-btn confirm-no-bg" onClick={handleDeleteClick}>
          Delete
        </Button>
        <ModalDelete
          modalBodyTitle="Are you sure you want to delete this list?"
          onDelete={(): void => onDelete(listId as string)}
          listId={listId}
        />
      </div>
    </div>
  )
}
