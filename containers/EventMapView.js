import React from 'react';
import { StyleSheet, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import isEqual from 'lodash/isEqual';

const GEOLOCATION_OPTIONS = {
	enableHighAccuracy: true,
	timeout: 20000,
	maximumAge: 1000
};
const ANCHOR = { x: 0.5, y: 0.5 };

const colorOfmyLocationMapMarker = 'blue';

class EventMapView extends React.Component {
	state = {
		region: {
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.05,
			longitudeDelta: 0.05
		},
		mounted: false,
		myPosition: null
	};

	componentDidMount() {
		this.setState({
			mounted: true
		});
		// If you supply a coordinate prop, we won't try to track location automatically

		if (Platform.OS === 'android') {
			PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((granted) => {
				if (granted && this.state.mounted) {
					this.watchLocation();
				}
			});
		} else {
			this.watchLocation();
		}
	}

	watchLocation() {
		this.watchID = Geolocation.watchPosition(
			(position) => {
				const myLastPosition = this.state.myPosition;
				const myPosition = position.coords;
				if (!isEqual(myPosition, myLastPosition)) {
					/*let newRegion = this.state.region;
					newRegion.latitude = myPosition.latitude;
					newRegion.longitude = myPosition.longitude;*/
					this.setState({
						myPosition: myPosition
						//region: newRegion
					});
				}
			},
			null,
			GEOLOCATION_OPTIONS
		);
		let newRegion = this.state.region;
		newRegion.latitude = this.state.myPosition.latitude;
		newRegion.longitude = this.state.myPosition.longitude;
	}

	onRegionChange = (region) => {
		this.setState({ region });
	};

	getMapRegion = () => ({
		latitude: this.state.region.latitude,
		longitude: this.state.region.longitude,
		latitudeDelta: 0.05,
		longitudeDelta: 0.05
	});

	componentWillUnmount() {
		this.setState({
			mounted: false
		});
		if (this.watchID) {
			Geolocation.clearWatch(this.watchID);
		}
	}

	render() {
		const myPosition = this.state.myPosition;
		if (!myPosition) {
			return null;
		}
		coordinate = myPosition;
		heading = myPosition.heading;

		return (
			<MapView style={{ flex: 1 }} initialRegion={this.state.region} onRegionChange={this.onRegionChange}>
				<Marker coordinate={coordinate} style={styles.mapMarker} />
			</MapView>
		);
	}
}

const SIZE = 35;
const HALO_RADIUS = 6;
const ARROW_SIZE = 7;
const ARROW_DISTANCE = 6;
const HALO_SIZE = SIZE + HALO_RADIUS;
const HEADING_BOX_SIZE = HALO_SIZE + ARROW_SIZE + ARROW_DISTANCE;

const styles = StyleSheet.create({
	mapMarker: {
		zIndex: 1000
	},
	// The container is necessary to protect the markerHalo shadow from clipping
	container: {
		width: HEADING_BOX_SIZE,
		height: HEADING_BOX_SIZE
	},
	heading: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: HEADING_BOX_SIZE,
		height: HEADING_BOX_SIZE,
		alignItems: 'center'
	},
	headingPointer: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderTopWidth: 0,
		borderRightWidth: ARROW_SIZE * 0.75,
		borderBottomWidth: ARROW_SIZE,
		borderLeftWidth: ARROW_SIZE * 0.75,
		borderTopColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: colorOfmyLocationMapMarker,
		borderLeftColor: 'transparent'
	},
	markerHalo: {
		position: 'absolute',
		backgroundColor: 'white',
		top: 0,
		left: 0,
		width: HALO_SIZE,
		height: HALO_SIZE,
		borderRadius: Math.ceil(HALO_SIZE / 2),
		margin: (HEADING_BOX_SIZE - HALO_SIZE) / 2,
		shadowColor: 'black',
		shadowOpacity: 0.25,
		shadowRadius: 2,
		shadowOffset: {
			height: 0,
			width: 0
		}
	},
	marker: {
		justifyContent: 'center',
		backgroundColor: colorOfmyLocationMapMarker,
		width: SIZE,
		height: SIZE,
		borderRadius: Math.ceil(SIZE / 2),
		margin: (HEADING_BOX_SIZE - SIZE) / 2
	},
	markerText: { width: 0, height: 0 }
});

export default EventMapView;

/*
componentDidMount() {
		Geolocation.getCurrentPosition((info) => {
			console.log(info);
			console.log(info.coords.latitude);
			console.log(info.coords.longitude);
			this.setState({
				initialPosition: {
					latitude: info.coords.latitude,
					longitude: info.coords.longitude,
					latitudeDelta: 0.10,
					longitudeDelta: 0.05
				}
			}, function (){
				console.log("updated state: " + this.state.initialPosition.latitude)
			});
		});
	}

*/
