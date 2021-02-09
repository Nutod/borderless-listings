import React from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error(`Auth context is not defined`)
  }

  return context
}
