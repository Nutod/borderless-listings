import React from 'react'
import { useLocalStorageState } from './hooks/useLocalStorage'
import { ListingsData } from './_data'
import { useAuth } from 'context/AuthContext'
import AuthenticatedApp from 'authenticated-app'
import UnauthenticatedApp from 'unauthenticated-app'

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
