import React from "react"
import { ListInterface } from "../../lib/interfaces/list.interface"
import "./List.scss"

interface ListProps {
  className: string
  list: ListInterface
  onSelect: (listId: string) => void
  onDelete: (listId: string) => void
  listId: string | undefined
}

export default function List(props: ListProps): JSX.Element {
  const { className, list, onSelect, onDelete, listId } = props

  return (
    <div className={className}>
      <h1 onClick={(): void => onSelect(listId as string)}>{list.title}</h1>
      <button onClick={(): void => onDelete(listId as string)}>Delete</button>
    </div>
  )
}
