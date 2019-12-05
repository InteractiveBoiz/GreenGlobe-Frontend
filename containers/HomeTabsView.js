import React from 'react';
import { Text, View } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import EventList from './EventList';

const style = {
	alignItems: 'center',
	justifyContent: 'center',
	height: 150,
	backgroundColor: '#fff'
};

const tabs = [ { title: 'List' }, { title: 'Map' } ];

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
