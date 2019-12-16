import React from 'react';
import { Text } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import GroupsList from './GroupsList';

const tabs = [ { title: 'Invitations' }, { title: 'Groups' }, { title: 'Friends' } ];

class SocialTabsView extends React.Component {
	render() {
		return (
			<Tabs tabs={tabs} initialPage={1}>
				<Text>Invitations</Text>
				<GroupsList />
				<Text>Friends</Text>
			</Tabs>
		);
	}
}

export default SocialTabsView;
