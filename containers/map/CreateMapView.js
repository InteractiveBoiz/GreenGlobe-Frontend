import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Button, Flex, WingBlank } from '@ant-design/react-native';
import CreateMapButtonContainer from '../../components/map/CreateMapButtonContainer';
import DraggableMarker from '../../components/map/DraggableMarker';
import { withNavigation } from 'react-navigation';

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

class CreateMapView extends React.Component {
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
		startDraggablePosition: {
			longitude: 0,
			latitude: 0
		},
		settingStartLocation: false,
		finnishedStartLocation: false,
		settingAreaLocation: false,
		areaPolygons: null,
		finnishedAreaLocation: false,
		endDraggablePosition: {
			longitude: 0,
			latitude: 0
		},
		settingEndLocation: false,
		finnishedEndLocation: false
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
					startDraggablePosition: initialRegion,
					endDraggablePosition: initialRegion
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

	goBack = () => {
		const startDraggablePosition  = this.state.startDraggablePosition;
		const areaPolygons = this.state.areaPolygons;
		const endDraggablePosition = this.state.endDraggablePosition;

		var mapData = {
			startDraggablePosition,
			areaPolygons,
			endDraggablePosition
		};
		//setEventState({ ...eventState, eventDescription: value });
		console.log('mapdate before send', mapData);
		const eventState = this.props.navigation.state.params.eventState
		this.props.navigation.state.params.onMapFinish({ ...eventState, map: mapData });
		this.props.navigation.goBack();
	};

	onSettingStartLocationPressed = () => {
		this.setState((prevState) => ({
			settingStartLocation: !prevState.settingStartLocation,
			finnishedStartLocation: true
		}));
	};

	onSettingAreaLocationPressed = () => {
		this.setState((prevState) => ({
			settingAreaLocation: !prevState.settingAreaLocation,
			finnishedAreaLocation: true
		}));
	};

	onSettingEndLocationPressed = () => {
		this.setState((prevState) => ({
			settingEndLocation: !prevState.settingEndLocation,
			finnishedEndLocation: true
		}));
	};

	setDraggablePosition = (newPos, type) => {
		if (type === 'startmarker') {
			this.setState(
				{
					startDraggablePosition: newPos
				},
				function() {
					console.log('set start draggable position', this.state.startDraggablePosition);
				}
			);
		} else {
			this.setState(
				{
					endDraggablePosition: newPos
				},
				function() {
					console.log('set end draggable position', this.state.endDraggablePosition);
				}
			);
		}
	};

	onPress = (e) => {
		if (!this.state.areaPolygons && this.state.settingAreaLocation) {
			this.setState(
				{
					areaPolygons: {
						coordinates: [ e.nativeEvent.coordinate ]
					}
				},
				function() {
					console.log(this.state.areaPolygons);
				}
			);
		} else if (this.state.settingAreaLocation) {
			this.setState(
				{
					areaPolygons: {
						...this.state.areaPolygons,
						coordinates: [ ...this.state.areaPolygons.coordinates, e.nativeEvent.coordinate ]
					}
				},
				function() {
					console.log(this.state.areaPolygons);
				}
			);
		}
	};

	render() {
		const mapOptions = {
			scrollEnabled: true
		};

		if (this.state.settingAreaLocation) {
			mapOptions.scrollEnabled = false;
			mapOptions.onPanDrag = (e) => this.onPress(e);
		}

		return (
			<View style={styles.container}>
				<MapView
					region={this.state.initialPosition}
					showsCompass={true}
					rotateEnabled={false}
					style={styles.map}
					onPress={(e) => this.onPress(e)}
					{...mapOptions}
				>
					<Marker coordinate={this.state.markerPosition}>
						<View style={styles.radius}>
							<View style={styles.marker} />
						</View>
					</Marker>

					<DraggableMarker
						settingLocation={this.state.settingStartLocation}
						finnishedSettingLocation={this.state.finnishedStartLocation}
						draggablePosition={this.state.startDraggablePosition}
						setDraggablePosition={this.setDraggablePosition}
						type={'startmarker'}
					/>

					<DraggableMarker
						settingLocation={this.state.settingEndLocation}
						finnishedSettingLocation={this.state.finnishedEndLocation}
						draggablePosition={this.state.endDraggablePosition}
						setDraggablePosition={this.setDraggablePosition}
						type={'endmarker'}
					/>

					{this.state.areaPolygons && (
						<Polygon
							coordinates={this.state.areaPolygons.coordinates}
							strokeColor="#000"
							fillColor="rgba(255,0,0,0.5)"
							strokeWidth={1}
						/>
					)}
				</MapView>
				<CreateMapButtonContainer
					settingStartLocation={this.state.settingStartLocation}
					settingAreaLocation={this.state.settingAreaLocation}
					settingEndLocation={this.state.settingEndLocation}
					onSettingStartLocationPressed={this.onSettingStartLocationPressed}
					onSettingAreaLocationPressed={this.onSettingAreaLocationPressed}
					onSettingEndLocationPressed={this.onSettingEndLocationPressed}
				/>
				<Button size="small" style={{ position: 'absolute', bottom: 25 }} onPress={this.goBack}>
					Finish
				</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//...StyleSheet.absoluteFillObject,
		//justifyContent: 'flex-end',
		alignItems: 'center'
		//backgroundColor: '#F5FCFF'
	},
	map: {
		/*left: 0,
		right: 0,
		top: 0,
		bottom: 0,
        position: 'absolute'*/
		...StyleSheet.absoluteFillObject
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
	},
	buttonContainer: {
		position: 'absolute',
		flexDirection: 'row',
		marginVertical: 20,
		backgroundColor: 'transparent'
	},
	overlay: {
		position: 'absolute',
		bottom: 25,
		flexDirection: 'row'
		//backgroundColor: 'rgba(255, 255, 255, 1)'
	},
	buttonStyle: {
		paddingLeft: 10,
		paddingRight: 10
	}
});

export default withNavigation(CreateMapView);

/*


{this.state.settingStartLocation || this.state.finnishedStartLocation ? (
						<Marker
							coordinate={this.state.startDraggablePosition}
							onSelect={(e) => console.log('onSelect', e)}
							onDrag={(e) => console.log('onDrag', e)}
							onDragStart={(e) => console.log('onDragStart', this.state.startDraggablePosition)}
							onDragEnd={(e) => {
								console.log('onDragEnd', e.nativeEvent.coordinate);
								this.setState(
									{
										startDraggablePosition: e.nativeEvent.coordinate
									},
									function() {
										console.log('update startposition', this.state.startDraggablePosition);
									}
								);
							}}
							onPress={(e) => console.log('onPress', e)}
							draggable
						/>
					) : null}*/
