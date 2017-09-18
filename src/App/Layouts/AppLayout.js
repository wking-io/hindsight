import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Nav from '../Nav';
import Dashboard from '../Dashboard';
import Retros from '../Retros';
import Members from '../Members';
import Foresights from '../Foresights';
import { ContentWrapper } from '../shared/Layout';

const AppLayout = () => (
  <div>
    <Nav />
    <ContentWrapper addSpace>
      <Switch>
        <Route exact path="/app" component={Dashboard} />
        <Route path="/app/retros" component={Retros} />
        <Route path="/app/members" component={Members} />
        <Route path="/app/foresights" component={Foresights} />
        <Redirect to="/app" />
      </Switch>
    </ContentWrapper>
  </div>
);

export default AppLayout;
