import React from 'react'

export const AuthContext = React.createContext()

AuthContext.displayName = 'authContext'

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = React.useState(false)

  const login = React.useCallback(() => setAuth(true), [])

  const logout = React.useCallback(() => setAuth(false), [])

  const value = { auth, login, logout }

  return <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>
}
