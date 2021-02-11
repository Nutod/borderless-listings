import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Listing from './pages/Listing'
import Listings from './pages/Listings'
import Login from './pages/Login'
import { useLocalStorageState } from './hooks/useLocalStorage'
import { ListingsData } from './_data'
import NotFound from './pages/NotFound'

// URL -> component
// / -> home
// /listings -> Listings
// /lisings?name=businessname -> Listings
// /login -> Login compoent
// /admin/business -> view all businesses [RUD]
// /admin/business/add -> create a new business listing [C]

function App() {
  const [listings, setListings] = useLocalStorageState('listings')

  React.useEffect(() => {
    if (!listings) {
      setListings(ListingsData)
    }
  }, [listings, setListings])

  return (
    <Switch>
      <Route path="/" exact>
        <Home listings={listings.slice(0, 4)} />
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

export default App
