import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home2019 from './lightupssp2019/LightUp2019';
import Homepage from './Homepage';
import './style.css';
import Admin from './admin/Admin';
import CustomMuiTheme from './CustomTheme';

export default function App() {
  document.title = 'Light Up SSP';
  return (
    <CustomMuiTheme>
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/2019">
            <Home2019 />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/">
            <p>Opps! Page not found.</p>
          </Route>
        </Switch>
      </Router>
    </CustomMuiTheme>
  );
}
