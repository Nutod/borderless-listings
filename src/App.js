import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useLocalStorageState } from './hooks/useLocalStorage'
import { ListingsData } from './_data'
import { FullPageSpinner } from 'components/FullPageSpinner'

import Home from 'pages/Home'
import Login from 'pages/Login'
import NotFound from 'pages/NotFound'

import AdminListings from 'pages/AdminListings'
import AdminListing from 'pages/AdminListing'

import Listings from 'pages/Listings'
import Listing from 'pages/Listing'

import ProtectedRoute from 'hoc/ProtectedRoute'
import Header from 'components/Header'
import Footer from 'components/Footer'

function UnauthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/listings/:id">
        <Listing />
      </Route>
      <Route path="/listings" exact>
        <Listings />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  )
}

function App() {
  const [listings, setListings] = useLocalStorageState('listings')
  const { pathname } = useLocation()

  console.log(pathname)

  React.useEffect(() => {
    if (!listings) {
      setListings(ListingsData)
    }
  }, [listings, setListings])

  // we probably might not need to suspend this JSX component
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {pathname !== '/login' ? <Header /> : null}
      <Switch>
        <Route path="/admin/listings/:id">
          <AdminListing />
        </Route>
        <ProtectedRoute path="/admin/listings" exact>
          <AdminListings />
        </ProtectedRoute>
        <UnauthenticatedRoutes />
      </Switch>
      {pathname !== '/login' ? <Footer /> : null}
    </React.Suspense>
  )
}

export default App
