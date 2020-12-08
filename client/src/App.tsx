import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './Hoc/Layout';
import BurgerBuilder from './Containers/BurgerBuilder';
import Checkout from "./Containers/Checkout";
import Orders from "./Containers/Orders";
// import styles from '../css/Main.module.css';

class App extends Component<any, any>{
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Main from './pages/Main';
// import NoMatch from './pages/NoMatch';


// function App(): any {
//   return (
//     <Router>
//       <div>
//         <Switch>
//           <Route exact path={["/"]} component={Main} />
//           <Route component={NoMatch} />
//         </Switch>
//       </div>
//     </Router>
//   )
// }

// export default App;

