import React from "react"
import { ListInterface } from "../../lib/interfaces/list.interface"
import "./List.scss"

interface ListProps {
  list: ListInterface
  onDelete: (index: number) => void
  listIndex: number
}

export default function List(props: ListProps): JSX.Element {
  const { list, onDelete, listIndex } = props

  return (
    <div className="list">
      <h1>{list.title}</h1>
      <button onClick={(): void => onDelete(listIndex)}>Delete</button>
    </div>
  )
}
