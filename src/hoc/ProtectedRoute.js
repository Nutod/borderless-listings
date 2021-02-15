import { Redirect, Route } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'

export default function ProtectedRoute({ children, ...rest }) {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user?.username ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}
