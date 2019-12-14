import React from 'react';
import { Text, View } from 'react-native';
import { Icon, SearchBar, TabBar } from '@ant-design/react-native';
import EventList from './EventList';
import CreateEventView from './CreateEventView';
import ManageMyEvents from './ManageMyEvents';
import { ATTENDING_EVENTS } from '../../graphql/event/EventQuerries';

class MyEventsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'attendingEvents'
		};
	}

	renderContent(pageText) {
		return (
			<View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
				<SearchBar placeholder="Search" showCancelButton />
				<Text style={{ margin: 50 }}>{pageText}</Text>
			</View>
		);
	}

	onChangeTab = (tabName) => {
		this.setState({
			selectedTab: tabName
		});
	}

	render() {
		return (
			<TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="#f5f5f5">
				<TabBar.Item
					title="Attending Events"
					icon={<Icon name="profile" />}
					selected={this.state.selectedTab === 'attendingEvents'}
					onPress={() => this.onChangeTab('attendingEvents')}
				>
					<EventList queryToUse={ATTENDING_EVENTS} variablesToUse={{ userId: 'user/1-A' }} />
				</TabBar.Item>
				<TabBar.Item
					icon={<Icon name="plus-circle" />}
					title="Create Event"
					selected={this.state.selectedTab === 'createEvent'}
					onPress={() => this.onChangeTab('createEvent')}
				>
					<CreateEventView onChangeTab={this.onChangeTab}/>
				</TabBar.Item>
				<TabBar.Item
					icon={<Icon name="edit" />}
					title="Manage My Events"
					selected={this.state.selectedTab === 'manageMyEvents'}
					onPress={() => this.onChangeTab('manageMyEvents')}
				>
					<ManageMyEvents/>
				</TabBar.Item>
			</TabBar>
		);
	}
}

export default MyEventsView;
