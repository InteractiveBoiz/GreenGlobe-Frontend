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
	console.log('typeof', Array.isArray(events));
	if (Array.isArray(events)) {
		return (
			<View>
				{events.map((marker) => {
					console.log('marker', marker.map.meetUpPosition);
					if (marker.map !== null && marker.map.meetUpPosition !== null) {
						return (
							<View key={marker.id}>
								<Marker
									coordinate={marker.map.meetUpPosition}
									onPress={() => props.setSelectedEvent(marker)}
								>
									<Callout
										onPress={() => props.navigation.navigate('EventDetail', { event: marker })}
									>
										<EventCard event={marker} navigation={props.navigation} />
									</Callout>
								</Marker>
							</View>
						);
					}
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
				{selectedEvent !== null &&
				selectedEvent.map.exitPosition !== null && (
					<Marker coordinate={selectedEvent.map.exitPosition} pinColor={'blue'} />
				)}
			</View>
		);
	} else {
		return (
			<View>
				{events.map.meetUpPosition !== null && (
					<Marker
						key={events.id}
						coordinate={events.map.meetUpPosition}
						onPress={() => props.setSelectedEvent(events)}
					>
						<Callout onPress={() => props.navigation.navigate('EventDetail', { event: events })}>
							<EventCard event={events} navigation={props.navigation} />
						</Callout>
					</Marker>
				)}
				{events.map.areaOfInterest !== null && (
					<Polygon
						coordinates={events.map.areaOfInterest}
						strokeColor="#000"
						fillColor="rgba(255,0,0,0.5)"
						strokeWidth={1}
					/>
				)}
				{events.map.exitPosition !== null && <Marker coordinate={events.map.exitPosition} pinColor={'blue'} />}
			</View>
		);
	}
};
export default withNavigation(MapEventsMarkers);
