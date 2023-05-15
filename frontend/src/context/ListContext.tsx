/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { ListInterface } from "../lib/interfaces/list.interface"
import { ListsService } from "../services/lists-service"

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

  const listsService = new ListsService()

  useEffect(() => {
    fetchListsFromDB()
  }, [])

  const fetchListsFromDB = (): void => {
    listsService
      .readLists()
      .then((lists) => {
        setLists(lists as ListInterface[])
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const addNewList = (newListTitle: string): void => {
    setLists((oldArray) => [...oldArray, { title: newListTitle }])

    listsService
      .addList({ title: newListTitle })
      .then((newList) => {
        setLists((oldArray) => [...oldArray, newList])
      })
      .catch((error) => {
        throw new Error(error)
      })
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
