import React from "react"
import { Modal, Button } from "react-bootstrap"
import { useModalDeleteContext } from "../../context/ModalDeleteContext"
import "./ModalDelete.scss"

interface ModalDeleteProps {
  modalBodyTitle: string
  onDelete: (listId: string) => void
  listId: string | undefined
}

export default function ModalDelete(props: ModalDeleteProps): JSX.Element {
  const { modalBodyTitle, onDelete, listId } = props

  const { modalIsDisplayed, closeModal } = useModalDeleteContext()

  const handleClose = (): void => {
    closeModal()
  }

  const handleDeleteClick = (): void => {
    onDelete(listId as string)
    closeModal()
  }

  return (
    <div className="modal-content">
      <Modal show={modalIsDisplayed} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "2.5rem" }}>Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ fontSize: "2rem" }}>
          <p>{modalBodyTitle}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button className="cancel-button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="delete-button" variant="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
