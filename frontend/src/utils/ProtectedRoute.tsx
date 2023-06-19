import React, { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useUserContext()
  const location = useLocation()

  if (!currentUser?.verified) {
    return <Navigate to="/authentification" state={{ from: location }} replace />
  }

  return <React.Fragment>{children}</React.Fragment>
}

export default ProtectedRoute
