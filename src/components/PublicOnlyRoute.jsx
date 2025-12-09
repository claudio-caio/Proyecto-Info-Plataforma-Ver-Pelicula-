import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth'

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext)

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />
  }

  return children
}

export default PublicOnlyRoute
