import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { UserContextProvider } from "./context/UserContext"
import Authentification from "./components/authentification/Authentification"
import Todos from "./components/todos/Todos"
import EmailConfirmation from "./components/email-confirmation/EmailConfirmation"
import ForgotPassword from "./components/forgot-password/ForgotPassword"
import NewPassword from "./components/new-password/NewPassword"
import { ToastContextProvider } from "./context/ToastContext"
import ProtectedRoute from "./utils/ProtectedRoute"
import "./App.scss"

export default function App(): JSX.Element {
  return (
    <div className="app">
      <ToastContextProvider>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/todos" replace />} />
            <Route path="/authentification" element={<Authentification />} />
            <Route
              path="/todos"
              element={
                <ProtectedRoute>
                  <Todos />
                </ProtectedRoute>
              }
            />
            <Route path="/auth/confirm/:id/:token" element={<EmailConfirmation />} />
            <Route path="/password/reset" element={<ForgotPassword />} />
            <Route path="/password/new/:id/:token" element={<NewPassword />} />
          </Routes>
        </UserContextProvider>
      </ToastContextProvider>
    </div>
  )
}
