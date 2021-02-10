import React from 'react'

export const AuthContext = React.createContext()

AuthContext.displayName = 'authContext'

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = React.useState(false)

  const toggleAuth = React.useCallback(
    () => setAuth(previousAuthValue => !previousAuthValue),
    []
  )

  const value = { auth, toggleAuth }

  return <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>
}
