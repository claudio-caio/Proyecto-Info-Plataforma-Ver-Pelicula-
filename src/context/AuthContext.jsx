import { useReducer } from 'react'
import { AuthContext } from './auth'

const initialState = {
  user: null,
  isAuthenticated: false,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
