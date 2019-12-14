import React from 'react';
import { Text, View } from 'react-native';
import EventList from './EventList';
import { HOSTING_EVENTS } from '../../graphql/event/EventQuerries';

class ManageMyEvents extends React.Component {
	render() {
		return (
			<EventList
				queryToUse={HOSTING_EVENTS}
				variablesToUse={{ userId: 'user/1-A' }}
				emptyListText={'You are not Hosting any Events'}
			/>
		);
	}
}

export default ManageMyEvents;
