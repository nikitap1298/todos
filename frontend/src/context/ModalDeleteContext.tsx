import React, { useContext, useState } from "react"
import { ContextProviderProps } from "../lib/custom-types/custom-types"

interface ModalDeleteContextInterface {
  modalIsDisplayed: boolean
  showModal: () => void
  closeModal: () => void
}

const ModalDeleteContext = React.createContext<ModalDeleteContextInterface>({
  modalIsDisplayed: false,
  showModal: () => void {},
  closeModal: () => void {},
})

export const ModalDeleteContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  const [modalIsDisplayed, setModalIsDisplayed] = useState<boolean>(false)

  const showModal = (): void => {
    setModalIsDisplayed(true)
  }

  const closeModal = (): void => {
    setModalIsDisplayed(false)
  }

  return (
    <ModalDeleteContext.Provider value={{ modalIsDisplayed, showModal, closeModal }}>
      {children}
    </ModalDeleteContext.Provider>
  )
}

export const useModalDeleteContext = (): ModalDeleteContextInterface => useContext(ModalDeleteContext)
