import React from 'react';
import { Text, View } from 'react-native';
import EventList from './EventList';
import { HOSTING_EVENTS } from '../../graphql/event/EventQuerries';

class ManageMyEvents extends React.Component {
	render() {
		return (
			<EventList
				queryToUse={HOSTING_EVENTS}
				variablesToUse={this.props.variablesToUse}
				emptyListText={'You are not Hosting any Events'}
			/>
		);
	}
}

export default ManageMyEvents;
