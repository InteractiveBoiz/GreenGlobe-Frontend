import React from 'react';
import { Text, View } from 'react-native';
import { Icon, SearchBar, TabBar } from '@ant-design/react-native';
import HomeTabsView from './events/HomeTabsView';
import SocialTabsView from './groups/SocialTabsView';
import EventQueryTest from '../components/events/EventQueryTest';

class BottomMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'homeTab'
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

	onChangeTab(tabName) {
		this.setState({
			selectedTab: tabName
		});
	}

	render() {
		return (
			<TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="#f5f5f5">
				<TabBar.Item
					title="Home"
					icon={<Icon name="home" />}
					selected={this.state.selectedTab === 'homeTab'}
					onPress={() => this.onChangeTab('homeTab')}
				>
					<HomeTabsView />
				</TabBar.Item>
				<TabBar.Item
					icon={<Icon name="user" />}
					title="Profile"
					selected={this.state.selectedTab === 'profileTab'}
					onPress={() => this.onChangeTab('profileTab')}
				>
					<Text>Profile</Text>
				</TabBar.Item>
				<TabBar.Item
					icon={<Icon name="like" />}
					title="Social"
					selected={this.state.selectedTab === 'socialTab'}
					onPress={() => this.onChangeTab('socialTab')}
				>
					<SocialTabsView />
				</TabBar.Item>
			</TabBar>
		);
	}
}

export default BottomMenu;
