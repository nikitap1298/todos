import React from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import { v4 as uuidv4 } from "uuid"
import Lists from "../list/Lists"
import { useListContext } from "../../context/ListContext"
import "./SideBar.scss"

export default function SideBar(): JSX.Element {
  const { addNewList } = useListContext()
  const handlePlusClick = (event: MouseFormEvent): void => {
    event.preventDefault()
    event.stopPropagation()
    addNewList("List 1")
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
                <Button variant="secondary" onClick={handlePlusClick}>
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
