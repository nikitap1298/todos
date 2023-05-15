import React, { useState } from "react"
import {
  Button,
  Navbar,
  Container,
  Offcanvas,
  Form,
  Modal,
} from "react-bootstrap"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import { v4 as uuidv4 } from "uuid"
import Lists from "../list/Lists"
import { useListContext } from "../../context/ListContext"
import "./SideBar.scss"

export default function SideBar(): JSX.Element {
  const { addNewList } = useListContext()

  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = (): void => {
    setShowModal(false)
  }

  const handleShowModal = (): void => {
    setShowModal(true)
  }

  return (
    <div>
      {[false].map((expand) => (
        <Navbar key={uuidv4()} expand={expand} className="nav-bar">
          <Container fluid>
            <Navbar.Brand href="#"></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Todos
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Lists />
                <Modal show={showModal} onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add List</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Example list"
                        autoFocus
                      />
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button variant="secondary" onClick={handleShowModal}>
                  +
                </Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  )
}
