import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Welcome from './Components/Welcome';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Board from './Board';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
          <Route exact path="/Board" component={Board}/>
          <Route exact path="/" component={Welcome}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
