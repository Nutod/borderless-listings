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

import Header from 'components/Header'
import Footer from 'components/Footer'

import ProtectedRoute from 'hoc/ProtectedRoute'
import AdminListingsAdd from 'pages/AdminListingsAdd'

function UnauthenticatedRoutes({ listings }) {
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
        <Home listings={listings} />
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
        <ProtectedRoute path="/admin/listings/add" exact>
          <AdminListingsAdd />
        </ProtectedRoute>
        <ProtectedRoute path="/admin/listings/:id">
          <AdminListing />
        </ProtectedRoute>
        <ProtectedRoute path="/admin/listings" exact>
          <AdminListings />
        </ProtectedRoute>
        <UnauthenticatedRoutes listings={listings.slice(0, 4)} />
      </Switch>
      {pathname !== '/login' ? <Footer /> : null}
    </React.Suspense>
  )
}

export default App
