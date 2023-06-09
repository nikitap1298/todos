import React from "react"
import { Modal, Button } from "react-bootstrap"
import { useModalDeleteContext } from "../../context/ModalDeleteContext"

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
    <div className="modal-delete">
      <Modal show={modalIsDisplayed} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{modalBodyTitle}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
