/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ApolloProvider } from 'react-apollo';
import { Provider } from '@ant-design/react-native';
import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import BottomMenu from './containers/BottomMenu';
import EventDetail from './components/EventDetail';
import Client from './graphql/Client';
import UserProvider from "./contexts/UserProvider";
import LoginPage from "./containers/login/LoginPage";
const MainNavigator = createStackNavigator(
	{
		Home: {
			screen: BottomMenu,
			navigationOptions: () => ({
				header: null
			})
		},
		EventDetail: {
			screen: EventDetail
		},
		Login: {
			screen: LoginPage
		}
	},
	{
		initialRouteName: 'Login'
	}
);

const AppContainer = createAppContainer(MainNavigator);
const App = () => {
	return (
		<UserProvider>
			<ApolloProvider client={Client}>
			<Provider>
				<LocaleProvider locale={enUS}>
					<AppContainer />
				</LocaleProvider>
			</Provider>
		</ApolloProvider>
		</UserProvider>
	);
};

export default App;
