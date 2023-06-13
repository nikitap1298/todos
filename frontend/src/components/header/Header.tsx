import React, { useEffect, useState } from "react"
import { localStorageSelectedListTitleKey } from "../../constants/constants"
import { useListContext } from "../../context/ListContext"

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
    <>
      {selectedListId ? (
        <h1 className="header"> My Todos: {selectedListTitle}</h1>
      ) : (
        <h1 className="header"> My Todos</h1>
      )}
    </>
  )
}
