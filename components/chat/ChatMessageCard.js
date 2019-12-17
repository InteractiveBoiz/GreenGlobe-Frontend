import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, WingBlank } from '@ant-design/react-native';

const ChatMessageCard = (props) => {
    console.log('props.message', props.message)
	return (
		<WingBlank size="lg">
			<Card full>
				<Card.Header
					title={props.message.owner}
					thumbStyle={{ width: 30, height: 30 }}
					thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
				/>
				<Card.Body>
					<View style={{ height: 42 }}>
						<Text style={{ marginLeft: 16 }}>{props.message.text}</Text>
					</View>
				</Card.Body>
				<Card.Footer extra={props.message.messageDateTime} />
			</Card>
		</WingBlank>
	);
};
export default ChatMessageCard;
