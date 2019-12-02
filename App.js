/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from '@ant-design/react-native';
import BottomMenu from "./containers/BottomMenu"
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import Client from './graphql/Client'
import EventListClass from './containers/EventListClass'

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

/*const App: () => React$Node = () => {
  return (
    <>
      <Provider>
         <EventList> Hello </EventList>
      </Provider>
    </>
  );
};*/

/*
<Button onPress={() => Toast.info('This is a toast tips')}>
            Start
          </Button>
*/

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
