import React from 'react';
import { Text, View } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import EventList from './EventList';
import EventDetail from '../components/EventDetail';

const style = {
	alignItems: 'center',
	justifyContent: 'center',
	height: 150,
	backgroundColor: '#fff'
};

const tabs = [ { title: 'List' }, { title: 'Map' } ];

/*const RootStack = StackNavigator(
	{
		List: {
			screen: EventList
		},
		EventDetail: {
			screen: EventDetail
		}
	},
	{
		initialRouteName: 'List'
	}
);*/



class HomeTabsView extends React.Component {
	render() {
		return (
			<Tabs tabs={tabs}>
				<EventList/>
				<View style={style}>
					<Text>Content of Third Tab</Text>
				</View>
			</Tabs>
		);
	}
}

export default HomeTabsView;
