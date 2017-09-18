import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../Login';

const UnauthorizedLayout = () => (
  <div>
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Redirect to="/auth/login" />
    </Switch>
  </div>
);

export default UnauthorizedLayout;
