import React from 'react';
import { BrowserRouter as Router, Route, Link,  Switch } from 'react-router-dom';

import Login from './components/login/Login';
import Friends from './components/friends/Friends';
import './App.css';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/protected'>Protected Page</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute path='/protected'>
            <Friends />
          </PrivateRoute>
          <Route path='/login' component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
