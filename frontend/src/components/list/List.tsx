import React from "react"
import { ListInterface } from "../../lib/interfaces/list.interface"
import "./List.scss"

interface ListProps {
  className: string
  list: ListInterface
  onSelect: (index: number) => void
  onDelete: (index: number) => void
  listIndex: number
}

export default function List(props: ListProps): JSX.Element {
  const { className, list, onSelect, onDelete, listIndex } = props

  return (
    <div className={className}>
      <h1 onClick={(): void => onSelect(listIndex)}>{list.title}</h1>
      <button onClick={(): void => onDelete(listIndex)}>Delete</button>
    </div>
  )
}
