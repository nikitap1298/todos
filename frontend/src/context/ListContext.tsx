/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"
import { ListInterface } from "../lib/interfaces/list.interface"
import { ListsService } from "../services/lists-service"
import {
  localStorageSelectedListIdKey,
  localStorageSelectedListTitleKey,
} from "../constants/constants"
import { useUserContext } from "./UserContext"

interface ListContextInterface {
  lists: ListInterface[]
  addNewList: (newListTitle: string) => void
  selectedListId: string | undefined
  selectList: (listId: string) => void
  deleteList: (listId: string) => void
}

const ListContext = React.createContext<ListContextInterface>({
  lists: [],
  addNewList: () => void {},
  selectedListId: "",
  selectList: () => void {},
  deleteList: () => void {},
})

export const ListContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  const { currentUser } = useUserContext()
  const [lists, setLists] = useState<ListInterface[]>([])
  const [selectedListId, setSelectedListId] = useState<string | undefined>("")

  const listsService = new ListsService()

  useEffect(() => {
    fetchListsFromDB()

    const selectedListIdLocalStorage = localStorage.getItem(localStorageSelectedListIdKey)
    if (typeof selectedListIdLocalStorage === "string") {
      setSelectedListId(JSON.parse(selectedListIdLocalStorage))
    }
  }, [])

  const fetchListsFromDB = (): void => {
    listsService.readLists().then((lists) => {
      setLists(lists as ListInterface[])
    })
  }

  const addNewList = (newListTitle: string): void => {
    const capitalizedMessage = newListTitle.charAt(0).toUpperCase() + newListTitle.slice(1).trim()

    listsService
      .addList({ userId: currentUser?._id, title: capitalizedMessage })
      .then((newList) => {
        setLists((oldArray) => [...oldArray, newList])
      })
  }

  const selectList = (listId: string): void => {
    console.log(`Selected list with Id: ${listId}`)

    const selectedListTitle = lists.find((element) => element._id === listId)?.title

    setSelectedListId(listId)
    localStorage.setItem(localStorageSelectedListIdKey, JSON.stringify(listId))
    localStorage.setItem(localStorageSelectedListTitleKey, JSON.stringify(selectedListTitle))
  }

  const deleteList = (listId: string): void => {
    const deletedList = lists.find((element) => element._id === listId) as ListInterface
    const newLists = lists.filter((element) => element._id !== listId)

    listsService.deleteList(deletedList).then(() => {
      setLists(newLists)
      localStorage.setItem(localStorageSelectedListIdKey, JSON.stringify(""))
    })
  }

  return (
    <ListContext.Provider value={{ lists, addNewList, selectedListId, selectList, deleteList }}>
      {children}
    </ListContext.Provider>
  )
}

export const useListContext = (): ListContextInterface => useContext(ListContext)
