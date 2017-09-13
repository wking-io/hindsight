import { createNetworkInterface, ApolloClient } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import store from 'store';
import { GC_AUTH_TOKEN } from './constants';

const networkInterface = createNetworkInterface({
  uri: 'your simple endpoint',
});

const wsClient = new SubscriptionClient('your subscription endpoint', {
  reconnect: true,
  connectionParams: {
    authToken: store.get(GC_AUTH_TOKEN),
  },
});

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

export default client;
