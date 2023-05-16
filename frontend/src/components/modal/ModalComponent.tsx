import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"

export default function ModalComponent(): JSX.Element {
  const [showModal, setShowModal] = useState(false)
  const [newListTitle, setNewListTitle] = useState("")

  const handleOpenClick = (): void => {
    setShowModal(true)
  }

  const handleCloseModal = (): void => {
    setShowModal(false)
  }

  const handleNewListInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault()
    console.log(event.target.value)

    // Reload page after click new keyboard button ??
    setNewListTitle(event.target.value)
  }

  const handleAddClick = (event: MouseFormEvent): void => {
    event.preventDefault()
    // addNewList(newListTitle)

    // Delete text from input
    setNewListTitle("")
    setShowModal(false)
  }

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddClick}>
            <Form.Label>Title</Form.Label>
            <Form.Control
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
  )
}
