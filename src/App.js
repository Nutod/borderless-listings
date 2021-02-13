import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Listing from './pages/Listing'
import Listings from './pages/Listings'
import Login from './pages/Login'
import { useLocalStorageState } from './hooks/useLocalStorage'
import { ListingsData } from './_data'
import NotFound from './pages/NotFound'
import AdminListings from './pages/AdminListings'
import AdminListing from './pages/AdminListing'
import { useAuth } from 'context/AuthContext'
import AuthenticatedApp from 'authenticated-app'
import UnauthenticatedApp from 'unauthenticated-app'

// /login -> Login compoent
// /admin/business -> view all businesses [RUD]
// /admin/business/add -> create a new business listing [C]

function App() {
  const [listings, setListings] = useLocalStorageState('listings')
  const { user } = useAuth()

  console.log(user)

  React.useEffect(() => {
    if (!listings) {
      setListings(ListingsData)
    }
  }, [listings, setListings])

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App

// <Switch>
//   <Route path="/" exact>
//     <Home listings={listings.slice(0, 4)} />
//   </Route>
//   <Route path="/listings" exact>
//     <Listings />
//   </Route>
//   <Route path="/listings/:id">
//     <Listing />
//   </Route>
//   <Route path="/login">
//     <Login />
//   </Route>
//   <Route path="/admin/listings" exact>
//     <AdminListings />
//   </Route>
//   <Route path="/admin/listings/:id">
//     <AdminListing />
//   </Route>
//   <Route path="*">
//     <NotFound />
//   </Route>
// </Switch>
