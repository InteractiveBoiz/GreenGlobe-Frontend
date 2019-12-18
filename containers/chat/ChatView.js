import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InputItem, WhiteSpace } from '@ant-design/react-native';
import ChatList from './ChatList';
import ChatInput from './ChatInput';

const ChatView = (props) => {
	const event = props.event;
	return (
		<View style={{ flex: 1 }}>
			<ChatList chatId={event.chatId} />
			<WhiteSpace />
			<View>
				<ChatInput chatId={event.chatId} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16
	}
});

export default ChatView;
