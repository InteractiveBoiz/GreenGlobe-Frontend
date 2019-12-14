import React from 'react';
import { Text, ScrollView } from 'react-native';
import { List, InputItem, TextareaItem, DatePicker, Checkbox, Picker, Button } from '@ant-design/react-native';
import { CREATE_EVENT } from '../../graphql/event/EventMutations';
import { GET_EVENTS } from '../../graphql/event/EventQuerries';
import { Mutation } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { gql } from '@apollo/client';

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

	onChangeTab(tabName) {
		this.setState({
			selectedTab: tabName
		});
	}

	onMapFinish = (data) => {
		this.setState({ mapData: data }, function() {
			console.log('mapdata :', this.state.mapData);
		});
	};

	render() {
		return (
			<Mutation
				mutation={CREATE_EVENT}
				update={(cache, { data }) => {
					const { events } = cache.readQuery({ query: GET_EVENTS });
					cache.writeQuery({
						query: GET_EVENTS,
						data: { events: events.concat([ data ]) }
					});
				}}
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
												hostId: 'user/1-A',
												isPublicEvent: this.state.isPublic,
												isOrganized: this.state.organized,
												eventActivity: this.state.activity,
												eventName: this.state.eventName,
												eventDescription: this.state.eventDescription,
												eventRequirements: this.state.eventRequirements,
												eventDate: this.state.eventStartDate,
												eventCreated: new Date(),
												eventEnd: this.state.eventEndDate,
												attendees: [],
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

export default withNavigation(CreateEventView);

/*

<Mutation mutation={ATTEND_EVENT}>
			{(attendMutation, { data }) => (
				
			)}
		</Mutation>
*/
