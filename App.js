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
import { LocaleProvider} from 'antd-mobile'
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import BottomMenu from './containers/BottomMenu';
import EventDetail from './components/events/EventDetail';
import CreateMapView from './containers/map/CreateMapView';
import Client from './graphql/Client';

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
		CreateEventMap: {
			screen: CreateMapView
		}
	},
	{
		initialRouteName: 'Home'
	}
);

const AppContainer = createAppContainer(MainNavigator);
const App = () => {
	return (
		<ApolloProvider client={Client}>
			<Provider>
				<LocaleProvider locale={enUS}>
					<AppContainer />
				</LocaleProvider>
			</Provider>
		</ApolloProvider>
	);
};

export default App;