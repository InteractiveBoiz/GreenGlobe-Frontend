import React from 'react';
import { ScrollView, Text } from 'react-native';
import { List } from '@ant-design/react-native';
import { gql } from '@apollo/client';
import { Query } from 'react-apollo';
import EventCard from '../components/EventCard';
import { withNavigation } from 'react-navigation';

const Item = List.Item;

const GET_EVENTS = gql`
	{
		events {
			id
			hostId
			isPublicEvent
			isOrganized
			eventActivity
			eventName
			eventDescription
			eventRequirements
			eventDate
			eventCreated
			eventEnd
			attendees
		}
	}
`;

const EventList = (props) => {
	return (
		<Query query={GET_EVENTS}>
			{({ loading, error, data }) => {
				if (loading) return <Text>Loading...</Text>;
				if (error) return <Text>Error! {error.message}</Text>;

				return (
					<ScrollView
						style={{ flex: 1, backgroundColor: '#f5f5f9' }}
						automaticallyAdjustContentInsets={false}
						showsHorizontalScrollIndicator={true}
						showsVerticalScrollIndicator={true}
					>
						<List>
							{data.events.map((event) => (
								<EventCard event={event} key={event.id} navigation={props.navigation} />
							))}
						</List>
					</ScrollView>
				);
			}}
		</Query>
	);
};
export default withNavigation(EventList);

/*
<List>{data.events.map(({ id, eventName }) => <EventCard eventName={eventName} key={id} />)}</List>
<Item data-seed="logId" key={id}>
                                <Text>{id}: {eventName}</Text>
							</Item>
							
const EventList = () => {
	const { loading, error, data } = useQuery(GET_EVENTS);

	if (loading)
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	if (error)
		return (
			<View>
				<Text>Error...</Text>
			</View>
		);
	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: '#f5f5f9' }}
			automaticallyAdjustContentInsets={false}
			showsHorizontalScrollIndicator={true}
			showsVerticalScrollIndicator={true}
		>
			<List>{data.events.map((event) => <EventCard event={event} key={event.id} />)}</List>
		</ScrollView>
	);
};



*/
