import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, WingBlank } from '@ant-design/react-native';
import { withNavigation } from 'react-navigation';

const EventCard = (props) => {
	return (
		<TouchableOpacity
			onPress={() =>
				props.navigation.navigate('EventDetail', { event: props.event, eventName: props.event.eventName })}
		>
			<WingBlank size="lg">
				<Card>
					<Card.Header
						title={props.event.eventName}
						thumbStyle={{ width: 30, height: 30 }}
						thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
					/>
					<Card.Body>
						<View style={{ height: 42 }}>
							<Text
								style={{ marginLeft: 16 }}
								//onPress={() => props.navigation.navigate('EventDetail', { event: props.event })}
							>
								{props.event.eventDescription}
							</Text>
						</View>
					</Card.Body>
					<Card.Footer content={props.event.eventActivity} extra={props.event.eventDate} />
				</Card>
			</WingBlank>
		</TouchableOpacity>
	);
};
export default withNavigation(EventCard);
