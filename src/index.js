import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import store from 'store';
import 'typeface-fira-sans';
import { GC_AUTH_TOKEN } from './lib/constants';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj70whc7z00qu0177u9d86wyf',
});

const wsClient = new SubscriptionClient(
  'wss://subscriptions.graph.cool/v1/cj70whc7z00qu0177u9d86wyf',
  {
    reconnect: true,
    connectionParams: {
      authToken: store.get(GC_AUTH_TOKEN),
    },
  },
);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      const token = store.get(GC_AUTH_TOKEN);
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
    },
  },
]);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
