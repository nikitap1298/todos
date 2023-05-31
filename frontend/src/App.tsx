import React from "react"
import { UserContextProvider } from "./context/UserContext"
import Todos from "./components/todos/Todos"
import { AlertContextProvider } from "./context/AlertContext"
import "./App.scss"

export default function App(): JSX.Element {
  return (
    <div className="app">
      <AlertContextProvider>
        <UserContextProvider>
          <Todos />
        </UserContextProvider>
      </AlertContextProvider>
    </div>
  )
}
