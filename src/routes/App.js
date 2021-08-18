import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter as Router, Route, Switch, Redirect, history } from 'react-router-dom';
import { Profile, Login, Register } from '../pages';
import { selectUser, selectIsAuthenticated } from '../features/userSlice';

const App = () => {

  const user = useSelector(selectIsAuthenticated);

  return (
  <Router>
    <Switch>
      <Route path="/" exact component={Login}  />
      <Route path="/signup" exact component={Register} />
      <Route path='/login' exact render={() => 
        ( !user ? <Login /> : <Redirect to='/feed' /> )}/>
      <Route path='/feed' render={() => 
        ( user ? <Profile /> : <Redirect to='/login' /> )}/>
    </Switch>
  </Router>
);
};

export default App;