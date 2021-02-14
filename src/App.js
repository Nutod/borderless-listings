import React from 'react'
import { Switch, Route } from 'react-router-dom'
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

  React.useEffect(() => {
    if (!listings) {
      setListings(ListingsData)
    }
  }, [listings, setListings])

  // we probably might not need to suspend this JSX component
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <Switch>
        <ProtectedRoute path="/admin/listings" exact>
          <AdminListings />
        </ProtectedRoute>
        <Route path="/admin/listings/:id">
          <AdminListing />
        </Route>
        <UnauthenticatedRoutes />
      </Switch>
    </React.Suspense>
  )
}

export default App
