import React, { useContext, useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { List, InputItem, TextareaItem, DatePicker, Checkbox, Picker, Button } from '@ant-design/react-native';
import { CREATE_EVENT } from '../../graphql/event/EventMutations';
import { CREATE_CHAT } from '../../graphql/chat/ChatMutations';
import { useMutation } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import UserContext from '../../contexts/UserContext';
import client from '../../graphql/ChatClient';

const activityTypes = [
	{ value: 'Cleanup_Small_Items', label: 'Cleanup Small Items' },
	{ value: 'Cleanup_Large_Items', label: 'Cleanup Large Items' },
	{ value: 'Ocean_Lake_River_Cleanup', label: 'Ocean Lake River Cleanup' },
	{ value: 'Tree_Planting', label: 'Tree Planting' },
	{ value: 'Flower_Planting', label: 'Flower Planting' },
	{ value: 'Environmental_Landscaping', label: 'Environmental Landscaping' },
	{ value: 'Help_Animals', label: 'Help Animals' },
	{ value: 'Seminar', label: 'Seminar' }
];

const CreateEventView = (props) => {
	const [ eventState, setEventState ] = useState({});
	const [ createdChat, setCreatedChat ] = useState(false);
	const contextValue = useContext(UserContext);
	let gonnaCreateEvent = false
	const [ createEventMutation, { loading: mutationEventLoading, error: mutationEventError } ] = useMutation(
		CREATE_EVENT
	);
	const [ createChatMutation, { data: chatData } ] = useMutation(CREATE_CHAT, {
		client: client
	});

	if (!createdChat && chatData != undefined) {
		gonnaCreateEvent = true
		setCreatedChat(true);
		console.log('got this far', eventState);
		console.log('chat data', chatData);
		createEventMutation({
			variables: {
				event: {
					hostId: contextValue.user.id,
					isPublicEvent: eventState.isPublic,
					isOrganized: eventState.organized,
					eventActivity: eventState.activity,
					eventName: eventState.eventName,
					eventDescription: eventState.eventDescription,
					eventRequirements: eventState.eventRequirements,
					eventDate: eventState.eventStartDate,
					eventCreated: new Date(),
					eventEnd: eventState.eventEndDate,
					attendees: [ contextValue.user.id ],
					map: {
						meetUpPosition: eventState.map.startDraggablePosition,
						areaOfInterest: eventState.map.areaPolygons.coordinates,
						exitPosition: eventState.map.endDraggablePosition
					},
					chatId: chatData.createChat.id
				}
			}
		}).then(console.log('actually managed to do it'));
	}

	onMapFinish = (data) => {
		this.setEventState({ ...eventState, map: data });
	};

	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: '#f5f5f9' }}
			automaticallyAdjustContentInsets={false}
			showsHorizontalScrollIndicator={true}
			showsVerticalScrollIndicator={true}
		>
			<List renderHeader={'Create Event'}>
				<InputItem
					clear
					value={eventState.eventName}
					onChange={(value) => {
						setEventState({ ...eventState, eventName: value });
					}}
					placeholder="Event Name.."
				>
					<Text style={{ fontSize: 12 }}>Event Name:</Text>
				</InputItem>
				<TextareaItem
					rows={4}
					placeholder="Event Description..."
					onChange={(value) => {
						setEventState({ ...eventState, eventDescription: value });
					}}
				/>
				<Checkbox
					checked={eventState.organized}
					onChange={(value) => {
						setEventState({ ...eventState, organized: value.target.checked });
					}}
				>
					Organized?
				</Checkbox>
				<Checkbox
					checked={eventState.isPublic}
					onChange={(value) => {
						setEventState({ ...eventState, isPublic: value.target.checked });
					}}
				>
					is Public?
				</Checkbox>
				<Picker
					data={activityTypes}
					cols={1}
					value={eventState.activity}
					onChange={(value) => {
						setEventState({ ...eventState, activity: value });
					}}
					style={{ fontSize: 5 }}
				>
					<List.Item arrow="horizontal">Choose Activity</List.Item>
				</Picker>
				<TextareaItem
					rows={4}
					placeholder="Requirements..."
					onChange={(value) => {
						setEventState({ ...eventState, eventRequirements: value });
					}}
				/>
				<DatePicker
					value={eventState.eventStartDate}
					mode="datetime"
					defaultDate={new Date()}
					minDate={new Date()}
					maxDate={new Date(2026, 11, 3)}
					onChange={(value) => {
						setEventState({ ...eventState, eventStartDate: value });
					}}
					format="YYYY-MM-DD"
					locale="en_US"
				>
					<List.Item arrow="horizontal">Select Start Date</List.Item>
				</DatePicker>
				<DatePicker
					value={eventState.eventEndDate}
					mode="datetime"
					defaultDate={new Date()}
					minDate={new Date()}
					maxDate={new Date(2026, 11, 3)}
					onChange={(value) => {
						setEventState({ ...eventState, eventEndDate: value });
					}}
					format="YYYY-MM-DD"
					locale="en_US"
				>
					<List.Item arrow="horizontal">Select End Date</List.Item>
				</DatePicker>
				<Button
					onPress={() =>
						props.navigation.navigate('CreateEventMap', {
							onMapFinish: setEventState,
							eventState: eventState
						})}
				>
					Create Map Details
				</Button>
				<Button
					type="primary"
					onPress={() => {
						createChatMutation({
							variables: {
								chat: {
									association: 'Group_Chat',
									members: [ contextValue.user.id ],
									messages: []
								}
							}
						});
					}}
				>
					Create Event
				</Button>
			</List>
		</ScrollView>
	);
};

export default withNavigation(CreateEventView);

/*

<Mutation mutation={ATTEND_EVENT}>
			{(attendMutation, { data }) => (
				
			)}
		</Mutation>
*/

/*

class CreateEventView extends React.Component {
	state = {
		eventName: '',
		eventDescription: '',
		eventRequirements: '',
		eventStartDate: null,
		eventEndDate: null,
		organized: false,
		isPublic: true,
		activity: [],
		mapData: null
	};

	onMapFinish = (data) => {
		this.setState({ mapData: data }, function() {
			console.log('mapdata :', this.state.mapData);
		});
	};

	render() {
		const value = this.context;
		return (
			<Mutation
				mutation={CREATE_EVENT}
				
			>
				{(createEventMutation) => (
					<ScrollView
						style={{ flex: 1, backgroundColor: '#f5f5f9' }}
						automaticallyAdjustContentInsets={false}
						showsHorizontalScrollIndicator={true}
						showsVerticalScrollIndicator={true}
					>
						<List renderHeader={'Create Event'}>
							<InputItem
								clear
								value={this.state.eventName}
								onChange={(value) => {
									this.setState({
										eventName: value
									});
								}}
								placeholder="Event Name.."
							>
								<Text style={{ fontSize: 12 }}>Event Name:</Text>
							</InputItem>
							<TextareaItem
								rows={4}
								placeholder="Event Description..."
								onChange={(value) => {
									this.setState({
										eventDescription: value
									});
								}}
							/>
							<Checkbox
								checked={this.state.organized}
								onChange={(event) => {
									this.setState({ organized: event.target.checked });
								}}
							>
								Organized?
							</Checkbox>
							<Checkbox
								checked={this.state.isPublic}
								onChange={(event) => {
									this.setState({ isPublic: event.target.checked });
								}}
							>
								is Public?
							</Checkbox>
							<Picker
								data={activityTypes}
								cols={1}
								value={this.state.activity}
								onChange={(value) => {
									this.setState({ activity: value });
								}}
								style={{ fontSize: 5 }}
							>
								<List.Item arrow="horizontal">Choose Activity</List.Item>
							</Picker>
							<TextareaItem
								rows={4}
								placeholder="Requirements..."
								onChange={(value) => {
									this.setState({
										eventRequirements: value
									});
								}}
							/>
							<DatePicker
								value={this.state.eventStartDate}
								mode="datetime"
								defaultDate={new Date()}
								minDate={new Date()}
								maxDate={new Date(2026, 11, 3)}
								onChange={(value) => {
									this.setState({ eventStartDate: value });
								}}
								format="YYYY-MM-DD"
								locale="en_US"
							>
								<List.Item arrow="horizontal">Select Start Date</List.Item>
							</DatePicker>
							<DatePicker
								value={this.state.eventEndDate}
								mode="datetime"
								defaultDate={new Date()}
								minDate={new Date()}
								maxDate={new Date(2026, 11, 3)}
								onChange={(value) => {
									this.setState({ eventEndDate: value });
								}}
								format="YYYY-MM-DD"
								locale="en_US"
							>
								<List.Item arrow="horizontal">Select End Date</List.Item>
							</DatePicker>
							<Button
								onPress={() =>
									this.props.navigation.navigate('CreateEventMap', {
										onMapFinish: this.onMapFinish
									})}
							>
								Create Map Details
							</Button>
							<Button
								type="primary"
								onPress={() => {
									createEventMutation({
										variables: {
											event: {
												hostId: value.user.id,
												isPublicEvent: this.state.isPublic,
												isOrganized: this.state.organized,
												eventActivity: this.state.activity,
												eventName: this.state.eventName,
												eventDescription: this.state.eventDescription,
												eventRequirements: this.state.eventRequirements,
												eventDate: this.state.eventStartDate,
												eventCreated: new Date(),
												eventEnd: this.state.eventEndDate,
												attendees: [value.user.id],
												map: {
													meetUpPosition: this.state.mapData.startDraggablePosition,
													areaOfInterest: this.state.mapData.areaPolygons.coordinates,
													exitPosition: this.state.mapData.endDraggablePosition
												}
											}
										}
									})
										.then((res) => console.log(res))
										.catch((err) => <Text>{err}</Text>);
								}}
							>
								Create Event
							</Button>
						</List>
					</ScrollView>
				)}
			</Mutation>
		);
	}
}
CreateEventView.contextType = UserContext;

export default withNavigation(CreateEventView);*/
