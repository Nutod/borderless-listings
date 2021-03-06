import React from 'react'
import * as auth from 'auth-provider'
import { client } from 'utils/api-client'
import { useAsync } from 'hooks/useAsync'
import { FullPageSpinner } from 'components/FullPageSpinner'
import { FullPageErrorFallback } from 'components/FullPageErrorFallback'

async function bootstrapAppData() {
  let user = null

  const token = await auth.getToken()

  if (token) {
    // in the real world, the token will be used to fetch actual user data
    // hopefully there'll be some data from here. If not refreshing the app will be necessary
    const data = await client('users/1')

    if (data) {
      user = data
    }
  }

  return user
}

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData()
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(
    form => auth.login(form).then(user => setData(user)),
    [setData]
  )

  const logout = React.useCallback(() => {
    auth.logout()
    setData(null)
  }, [setData])

  const value = React.useMemo(() => ({ user, login, logout }), [
    login,
    logout,
    user,
  ])

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }

  return context
}

export { AuthProvider, useAuth }
