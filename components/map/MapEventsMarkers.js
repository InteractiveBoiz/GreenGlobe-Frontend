import React from 'react';
import EventCard from '../../components/events/EventCard';
import { withNavigation } from 'react-navigation';
import { Marker, Callout, Polygon } from 'react-native-maps';
import { View } from 'react-native';

const MapEventsMarkers = (props) => {
	const events = props.events;
	const selectedEvent = props.selectedEvent;

	console.log('events', events);
	console.log('selectedEvent', selectedEvent);
	return (
		<View>
			{events.map((marker) => {
				console.log('marker', marker.map.meetUpPosition);
				return (
					<Marker
						key={marker.id}
						coordinate={marker.map.meetUpPosition}
						onPress={() => props.setSelectedEvent(marker)}
					>
						<Callout onPress={() => props.navigation.navigate('EventDetail', { event: marker })}>
							<EventCard event={marker} navigation={props.navigation} />
						</Callout>
					</Marker>
				);
			})}
			{selectedEvent !== null &&
			selectedEvent.map.areaOfInterest !== null && (
				<Polygon
					coordinates={selectedEvent.map.areaOfInterest}
					strokeColor="#000"
					fillColor="rgba(255,0,0,0.5)"
					strokeWidth={1}
				/>
			)}
		</View>
	);
};
export default withNavigation(MapEventsMarkers);