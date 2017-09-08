import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import store from 'store';
import AppLayout from '../layouts/AppLayout';
import UnauthorizedLayout from '../layouts/UnauthorizedLayout';
import MarketingLayout from '../layouts/MarketingLayout';
import { GC_USER_ID } from '../lib/constants';

class App extends Component {
  state = {
    isUser: 0,
  };

  componentWillMount() {
    this.fetchUser();
  }

  fetchUser() {
    this.setState({
      isUser: store.get(GC_USER_ID),
    });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={MarketingLayout} />
          <Route path="/auth" render={routeProps => <UnauthorizedLayout {...routeProps} />} />
          <Route
            path="/app"
            render={routeProps =>
              (this.state.isUser ? (
                <AppLayout {...routeProps} />
              ) : (
                <Redirect
                  to={{
                    pathname: '/auth/login',
                    state: { login: true },
                  }}
                />
              ))}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
