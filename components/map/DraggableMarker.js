import React from 'react';
import { Marker } from 'react-native-maps';

const DraggableMarker = (props) => {
	if (props.settingLocation || props.finnishedSettingLocation) {
		return (
			<Marker
				coordinate={props.draggablePosition}
				onSelect={(e) => console.log('onSelect', e)}
				onDrag={(e) => console.log('onDrag', e)}
				onDragStart={(e) => console.log('onDragStart', props.draggablePosition)}
				onDragEnd={(e) => {
					console.log('onDragEnd', e.nativeEvent.coordinate);
					props.setDraggablePosition(e.nativeEvent.coordinate, props.type);
				}}
				onPress={(e) => console.log('onPress', e)}
				draggable={props.settingLocation && props.finnishedSettingLocation}
				pinColor={props.type === 'startmarker' ? 'red' : 'blue'}
			/>
		);
	}

	return null;
};

export default DraggableMarker;

/*
const StartPositionMarker = (props) => {
	if (props.settingStartLocation || props.finnishedStartLocation) {
		return (
			<Marker
				coordinate={props.startDraggablePosition}
				onSelect={(e) => console.log('onSelect', e)}
				onDrag={(e) => console.log('onDrag', e)}
				onDragStart={(e) => console.log('onDragStart', props.startDraggablePosition)}
				onDragEnd={(e) => {
					console.log('onDragEnd', e.nativeEvent.coordinate);
					/*this.setState(
						{
							startDraggablePosition: e.nativeEvent.coordinate
						},
						function() {
							console.log('update startposition', props.startDraggablePosition);
						}
					);
				}}
				onPress={(e) => console.log('onPress', e)}
				draggable
			/>
		);
	}

	return null;
};*/
