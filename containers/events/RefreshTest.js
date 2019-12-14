import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '@ant-design/react-native';

const RefreshTest = (props) => {
	return (
		<Button
			type="primary"
			onPress={() => props.refetch()}
		>
			Refresh!
		</Button>
	);
};

export default RefreshTest;
