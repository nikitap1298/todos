/* eslint-disable no-console */
import React, { useContext, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { ListInterface } from "../lib/interfaces/list.interface"

interface ListContextInterface {
  lists: ListInterface[]
  addNewList: (newListTitle: string) => void
  deleteList: (index: number) => void
}

const ListContext = React.createContext<ListContextInterface>({
  lists: [],
  addNewList: () => void {},
  deleteList: () => void {},
})

export const ListContextProvider = ({
  children,
}: ContextProviderProps): JSX.Element => {
  const [lists, setLists] = useState<ListInterface[]>([])

  const addNewList = (newListTitle: string): void => {
    setLists((oldArray) => [...oldArray, { title: newListTitle }])
  }

  const deleteList = (index: number): void => {
    console.log(`Delete list: ${index}`)
  }

  return (
    <ListContext.Provider value={{ lists, addNewList, deleteList }}>
      {children}
    </ListContext.Provider>
  )
}

export const useListContext = (): ListContextInterface =>
  useContext(ListContext)
