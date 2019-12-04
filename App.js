/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from '@ant-design/react-native';
import BottomMenu from "./containers/BottomMenu"
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Client from './graphql/Client'

// Create the client as outlined in the setup guide
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    //uri: 'http://localhost:5000/api/Event/',
    uri: 'http://10.0.2.2:5000/api/event/',
  })
});

class App extends React.Component {
  state = {
    isReady: false
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider>
          {<BottomMenu/>}
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
