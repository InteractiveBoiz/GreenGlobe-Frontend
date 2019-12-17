import React from 'react';
import { Text } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import GroupsList from './GroupsList';
import ChatView from '../chat/ChatView';

const tabs = [ { title: 'Invitations' }, { title: 'Groups' }, { title: 'Friends' }, { title: 'Chat' } ];

class SocialTabsView extends React.Component {
	render() {
		return (
			<Tabs tabs={tabs} initialPage={1}>
				<Text>Invitations</Text>
				<GroupsList />
				<Text>Friends</Text>
				<ChatView/>
			</Tabs>
		);
	}
}

export default SocialTabsView;
