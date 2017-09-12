import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppNav from '../components/AppNav';
import Dashboard from '../components/Dashboard';
import Retros from '../components/Retros';
import Members from '../components/Members';
import Foresights from '../components/Foresights';
import { ContentWrapper } from '../components/Layout';

const AppLayout = () => (
  <div>
    <AppNav />
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
