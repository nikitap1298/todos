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
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{modalBodyTitle}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button className="confirm-no-bg" variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="confirm-no-bg f"
            style={{ color: "red" }}
            variant="light"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
