import React, { useEffect, useState } from "react"
import { localStorageSelectedListTitleKey } from "../../constants/constants"
import { useListContext } from "../../context/ListContext"
import "./Header.scss"

export default function Header(): JSX.Element {
  const { selectedListId, editList } = useListContext()
  const [selectedListTitle, setSelectedListTitle] = useState("")
  useEffect(() => {
    const selectedListTitleLocalStorage = localStorage.getItem(localStorageSelectedListTitleKey)
    if (typeof selectedListTitleLocalStorage === "string") {
      setSelectedListTitle(JSON.parse(selectedListTitleLocalStorage))
    }
  }, [selectedListId, editList])

  return (
    <div className="header">
      {selectedListId ? <h1> My Todos: {selectedListTitle}</h1> : <h1> My Todos</h1>}
    </div>
  )
}
