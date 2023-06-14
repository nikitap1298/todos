import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { UserContextProvider } from "./context/UserContext"
import Todos from "./components/todos/Todos"
import { AlertContextProvider } from "./context/AlertContext"
import EmailConfirmation from "./components/email-confirmation/EmailConfirmation"
import ForgotPassword from "./components/forgot-password/ForgotPassword"
import NewPassword from "./components/new-password/NewPassword"
import { ToastContextProvider } from "./context/ToastContext"
import "./App.scss"

export default function App(): JSX.Element {
  return (
    <div className="app">
      <ToastContextProvider>
        <AlertContextProvider>
          <UserContextProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/todos" replace />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/auth/confirm/:id/:token" element={<EmailConfirmation />} />
              <Route path="/password/reset" element={<ForgotPassword />} />
              <Route path="/password/new/:id/:token" element={<NewPassword />} />
            </Routes>
          </UserContextProvider>
        </AlertContextProvider>
      </ToastContextProvider>
    </div>
  )
}
