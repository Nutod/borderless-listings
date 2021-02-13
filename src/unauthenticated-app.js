import { Route, Switch } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { FullPageErrorFallback } from './components/FullPageErrorFallback'
import Home from 'pages/Home'
import Listings from 'pages/Listings'
import NotFound from 'pages/NotFound'
import Header from 'components/Header'
import Listing from 'pages/Listing'
import Login from 'pages/Login'
import Footer from 'components/Footer'

function UnauthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <UnauthenticatedAppRoutes />
    </ErrorBoundary>
  )
}

function UnauthenticatedAppRoutes() {
  return (
    <>
      <Header />

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

      <Footer />
    </>
  )
}

export default UnauthenticatedApp
