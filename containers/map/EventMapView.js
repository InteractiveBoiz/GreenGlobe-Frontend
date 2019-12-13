import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;

const LATTITUDE_DELTA = 0.0922;
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;

const GEOLOCATION_OPTIONS = {
	enableHighAccuracy: true,
	timeout: 20000,
	maximumAge: 1000
};

class EventMapView extends React.Component {
	state = {
		initialPosition: {
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.05,
			longitudeDelta: 0.05
		},
		markerPosition: {
			latitude: 0,
			longitude: 0
		},
		draggablePosition: {
			latitude: 0,
			longitude: 0
		}
	};

	componentDidMount() {
		Geolocation.getCurrentPosition(
			(position) => {
				var lat = parseFloat(position.coords.latitude);
				var long = parseFloat(position.coords.longitude);

				var initialRegion = {
					latitude: lat,
					longitude: long,
					latitudeDelta: LATTITUDE_DELTA,
					longitudeDelta: LONGTITUDE_DELTA
				};

				this.setState({
					initialPosition: initialRegion,
					markerPosition: initialRegion,
					draggablePosition: initialRegion
				});
			},
			(error) => alert(JSON.stringify(error)),
			GEOLOCATION_OPTIONS
		);

		this.watchID = Geolocation.watchPosition(
			(position) => {
				var lat = parseFloat(position.coords.latitude);
				var long = parseFloat(position.coords.longitude);

				var lastRegion = {
					latitude: lat,
					longitude: long,
					latitudeDelta: LATTITUDE_DELTA,
					longitudeDelta: LONGTITUDE_DELTA
				};

				this.setState(
					{
						initialPosition: lastRegion,
						markerPosition: lastRegion
					},
					console.log('setting position', this.state.initialPosition)
				);
			},
			(error) => alert(JSON.stringify(error)),
			GEOLOCATION_OPTIONS
		);
	}

	componentWillUnmount() {
		if (this.watchID) {
			Geolocation.clearWatch(this.watchID);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<MapView
					region={this.state.initialPosition}
					showsCompass={true}
					rotateEnabled={false}
					style={styles.map}
				>
					<Marker coordinate={this.state.markerPosition}>
						<View style={styles.radius}>
							<View style={styles.marker} />
						</View>
					</Marker>
				</MapView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	map: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute'
	},
	marker: {
		height: 20,
		width: 20,
		borderWidth: 3,
		borderColor: 'white',
		borderRadius: 20 / 2,
		overflow: 'hidden',
		backgroundColor: '#007AFF'
	},
	radius: {
		height: 50,
		width: 50,
		borderRadius: 50 / 2,
		overflow: 'hidden',
		backgroundColor: 'rgba(0, 122, 255, 0.1)',
		borderWidth: 1,
		borderColor: 'rgba(0, 112, 255, 0.3)',
		alignItems: 'center',
		justifyContent: 'center'
	}
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

/*



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
					newRegion.longitude = myPosition.longitude;
					this.setState({
						myPosition: myPosition
						//region: newRegion
					});
				}
			},
			null,
			GEOLOCATION_OPTIONS
		);
		getCurrentLocation().then((position) => {
			if (position) {
				this.setState({
					region: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: 0.003,
						longitudeDelta: 0.003
					}
				},function (){
					console.log('thist state region', this.state.region)
				});
			}
		});
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
			<MapView style={{ flex: 1 }} initialRegion={this.state.region} region={this.state.region} onRegionChange={this.onRegionChange}>
				<Marker coordinate={coordinate} style={styles.mapMarker} />
			</MapView>
		);
	}*/
