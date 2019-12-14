import React from 'react';
import { Tabs } from '@ant-design/react-native';
import EventList from './EventList';
import MyEventsView from './MyEventsView';
import EventMapView from '../map/EventMapView';
import { GET_EVENTS } from '../../graphql/event/EventQuerries';

const style = {
	alignItems: 'center',
	justifyContent: 'center',
	height: 150,
	backgroundColor: '#fff'
};

const tabs = [ { title: 'My Events' }, { title: 'List' }, { title: 'Map' } ];

class HomeTabsView extends React.Component {

	render() {
		return (
			<Tabs tabs={tabs} initialPage={1}>
				<MyEventsView />
				<EventList queryToUse={GET_EVENTS} variablesToUse={{ userId: 'user/1-A' }} />
				<EventMapView queryToUse={GET_EVENTS} variablesToUse={{}} />
			</Tabs>
		);
	}
}

export default HomeTabsView;
