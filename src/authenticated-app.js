import { Route, Switch } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { FullPageErrorFallback } from './components/FullPageErrorFallback'
import Home from 'pages/Home'
import NotFound from 'pages/NotFound'
import AdminListings from 'pages/AdminListings'
import Listings from 'pages/Listings'
import Listing from 'pages/Listing'
import Login from 'pages/Login'

function AuthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <AuthenticatedAppRoutes />
    </ErrorBoundary>
  )
}

function AuthenticatedAppRoutes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/listings" exact>
        <Listings />
      </Route>
      <Route path="/listings/:id">
        <Listing />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  )
}

export default AuthenticatedApp
