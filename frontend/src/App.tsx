import React from "react"
import { UserContextProvider } from "./context/UserContext"
import Todos from "./components/todos/Todos"
import "./App.scss"

export default function App(): JSX.Element {
  return (
    <div className="app">
      <UserContextProvider>
        <Todos />
      </UserContextProvider>
    </div>
  )
}
