import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext)

  // Si no está autenticado, redirige a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Si está autenticado, renderiza el componente
  return children
}

export default ProtectedRoute
