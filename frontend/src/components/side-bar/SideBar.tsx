import React from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import { MouseFormEvent } from "../../lib/custom-types/custom-types"
import { v4 as uuidv4 } from "uuid"
import "./SideBar.scss"
import List from "../list/List"

export default function SideBar(): JSX.Element {
  const handlePlusClick = (event: MouseFormEvent): void => {
    console.log("Click Plus")
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
                <List />
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
