import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from './pages/Main';
import NoMatch from './pages/NoMatch';

function App(): any {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path={["/"]} component={Main} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;

