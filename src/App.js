import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Home from './lightupssp2019/LightUp2019'
import Homepage from './Homepage'
import './style.css'
import Admin from './admin/Admin'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/admin'>
          <Admin/>
        </Route>
        <Route path='/2019'>
          <Home/>
        </Route>
        <Route exact path='/'>
          <Homepage/>
        </Route>
        <Route path='/'>
          <p>Opps! Page not found.</p>
        </Route>
      </Switch>
    </Router>
  )
}

export default App