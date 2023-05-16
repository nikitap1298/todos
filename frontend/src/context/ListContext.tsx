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
    const capitalizedMessage =
      newListTitle.charAt(0).toUpperCase() + newListTitle.slice(1).trim()

    listsService
      .addList({ title: capitalizedMessage })
      .then((newList) => {
        setLists((oldArray) => [...oldArray, newList])
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const deleteList = (index: number): void => {
    const deletedList = lists[index]
    const newLists = lists.filter((element) => element._id !== deletedList._id)

    listsService.deleteList(deletedList).then(() => {
      setLists(newLists)
    })
  }

  return (
    <ListContext.Provider value={{ lists, addNewList, deleteList }}>
      {children}
    </ListContext.Provider>
  )
}

export const useListContext = (): ListContextInterface =>
  useContext(ListContext)
