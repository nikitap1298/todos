/* eslint-disable no-console */
import React, { useState } from "react"
import Lists from "../list/Lists"
import { Button, Form, Modal } from "react-bootstrap"
import { useListContext } from "../../context/ListContext"
import { useUserContext } from "../../context/UserContext"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import "./SideBar.scss"

export default function SideBar(): JSX.Element {
  const { logOut } = useUserContext()
  const { addNewList } = useListContext()

  const [showModal, setShowModal] = useState(false)
  const [newListTitle, setNewListTitle] = useState("")

  const handleOpenClick = (): void => {
    setShowModal(true)
  }

  const handleCloseModal = (): void => {
    setShowModal(false)
  }

  const handleNewListInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewListTitle(event.target.value)
  }

  const handleAddClick = (event: MouseFormEvent): void => {
    event.preventDefault()
    addNewList(newListTitle)

    // Delete text from input
    setNewListTitle("")
    setShowModal(false)
  }

  const handleLogOutClick = (): void => {
    logOut()
  }

  return (
    <div className="side-bar">
      <div>
        <Button variant="primary" size="lg" onClick={handleOpenClick}>
          Add new list
        </Button>
        <Lists />
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddClick}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                maxLength={15}
                type="text"
                placeholder="Example list"
                onChange={handleNewListInputChange}
                autoFocus
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleAddClick}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="side-bar-user-buttons">
        <Button variant="danger" size="lg" onClick={handleLogOutClick}>
          Log Out
        </Button>
      </div>
    </div>
  )
}
