/* eslint-disable no-console */
import React from "react"
import Lists from "../list/Lists"
import { useListContext } from "../../context/ListContext"
import "./SideBar.scss"

export default function SideBar(): JSX.Element {
  const { addNewList } = useListContext()

  return (
    <div className="side-bar">
      <button>+</button>
      <Lists />
    </div>
  )
}
