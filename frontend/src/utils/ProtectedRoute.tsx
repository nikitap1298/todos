import React, { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

interface RootState {
  user: {
    user: {
      name: string
      isAuthenticated: boolean
    }
  }
}

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user)
  const location = useLocation()  
  
  if (!user.user.isAuthenticated) {
    return <Navigate to="/authentification" state={{ from: location }} replace />
  }

  return <React.Fragment>{children}</React.Fragment>
}

export default ProtectedRoute
