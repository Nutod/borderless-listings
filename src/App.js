import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Listing from './pages/Listing'
import Listings from './pages/Listings'
import Login from './pages/Login'

// URL -> component
// / -> home
// /listings -> Listings
// /lisings?name=businessname -> Listings
// /login -> Login compoent
// /admin/business -> view all businesses [RUD]
// /admin/business/add -> create a new business listing [C]

function App() {
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
    </Switch>
  )
}

export default App
