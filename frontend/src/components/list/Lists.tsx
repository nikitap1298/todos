import React from "react"
import List from "./List"
import { v4 as uuidv4 } from "uuid"
import { useListContext } from "../../context/ListContext"
import { ListInterface } from "../../lib/interfaces/list.interface"

export default function Lists(): JSX.Element {
  const { lists, deleteList } = useListContext()

  return (
    <div>
      {lists.map((list: ListInterface, index: number) => (
        <List
          key={uuidv4()}
          list={list}
          onDelete={deleteList}
          listIndex={index}
        />
      ))}
    </div>
  )
}
