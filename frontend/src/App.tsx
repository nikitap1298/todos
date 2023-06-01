import React from "react"
import { Routes, Route } from "react-router-dom"
import { UserContextProvider } from "./context/UserContext"
import Todos from "./components/todos/Todos"
import { AlertContextProvider } from "./context/AlertContext"
import EmailConfirmation from "./components/email-confirmation/EmailConfirmation"
import "./App.scss"

export default function App(): JSX.Element {
  return (
    <div className="app">
      <AlertContextProvider>
        <UserContextProvider>
          <Routes>
            <Route path="/todos" element={<Todos />} />
            <Route path="/email-confirmation" element={<EmailConfirmation />} />
          </Routes>
        </UserContextProvider>
      </AlertContextProvider>
    </div>
  )
}
