import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import store from 'store';
import AppLayout from './Layouts/AppLayout';
import UnauthorizedLayout from './Layouts/UnauthorizedLayout';
import MarketingLayout from './Layouts/MarketingLayout';
import { GC_USER_ID } from '../utils/graphcool';

class App extends Component {
  state = {
    isUser: 0
  };

  componentWillMount() {
    this.fetchUser();
  }

  fetchUser() {
    this.setState({
      isUser: store.get(GC_USER_ID)
    });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => (
              <MarketingLayout {...routeProps} isUser={this.state.isUser} />
            )}
          />
          <Route
            path="/auth"
            render={routeProps => <UnauthorizedLayout {...routeProps} />}
          />
          <Route
            path="/app"
            render={routeProps =>
              this.state.isUser ? (
                <AppLayout {...routeProps} />
              ) : (
                <Redirect
                  to={{
                    pathname: '/auth/login',
                    state: { login: true }
                  }}
                />
              )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
