/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import BottomMenu from './containers/BottomMenu'
import EventDetail from './components/EventDetail'

const MainNavigator = createStackNavigator(
	{

		Home: {
      screen: BottomMenu,
      navigationOptions: () => ({
        header: null
      }),
		},
		EventDetail: {
			screen: EventDetail
		}
	},
	{
		initialRouteName: 'Home'
	}
);

/*class App extends React.Component {
  state = {
    isReady: false
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider>
          <MainNavigator/>
        </Provider>
      </ApolloProvider>
    );
  }
}*/
const App = createAppContainer(MainNavigator)

export default App;

/*
render() {
    return (
      <ApolloProvider client={client}>
        <Provider>
          <BottomMenu/>
        </Provider>
      </ApolloProvider>
    );
  }


*/