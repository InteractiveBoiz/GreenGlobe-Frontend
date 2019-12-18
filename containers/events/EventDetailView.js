import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import EventDetail from '../../components/events/EventDetail';
import EventMapView from '../../containers/map/EventMapView';
import { GET_EVENT } from '../../graphql/event/EventQuerries';
import UserContext from "../../contexts/UserContext";
import ChatView from '../chat/ChatView';

const attendingTabs = [ { title: 'Event Details' }, { title: 'Event Map' }, { title: 'Chat' } ];
const notAttendingtabs = [ { title: 'Event Details' }, { title: 'Event Map' } ];

const EventDetailView = (props) => {
	const userContext = useContext(UserContext);
	const event = props.navigation.getParam('event');

	return (
		<Tabs tabs={!event.attendees.includes(userContext.user.id) ? notAttendingtabs : attendingTabs} initialPage={0}>
			<EventDetail event={event} />
			<EventMapView queryToUse={GET_EVENT} variablesToUse={{ id: event.id }} />
			<ChatView event={event}/>
		</Tabs>
	);
};

/*queryToUse: GET_EVENT,
									variablesToUse: { id: event.id },
									eventName: event.eventName*/

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#fff'
	},
	containerHorizontal: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 150
	},
	containerVertical: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 150
	},
	text: {
		color: '#fff',
		fontSize: 36
	}
});

export default EventDetailView;
