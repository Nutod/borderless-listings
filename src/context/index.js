import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './AuthContext'

function AppProviders({ children }) {
  return (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  )
}

export { AppProviders }
