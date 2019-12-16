import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, WingBlank } from '@ant-design/react-native';
import { withNavigation } from 'react-navigation';

const GroupCard = (props) => {
	return (
		<TouchableOpacity>
			<WingBlank size="lg">
				<Card>
					<Card.Header
						title={props.group.name}
						thumbStyle={{ width: 30, height: 30 }}
						thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
					/>
					<Card.Body>
						<View style={{ height: 42 }}>
							<Text
								style={{ marginLeft: 16 }}
								//onPress={() => props.navigation.navigate('EventDetail', { event: props.event })}
							>
								{props.group.description}
							</Text>
						</View>
					</Card.Body>
					<Card.Footer content={props.group.privacy} />
				</Card>
			</WingBlank>
		</TouchableOpacity>
	);
};
export default withNavigation(GroupCard);
