import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InputItem, WhiteSpace } from '@ant-design/react-native';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import ChatMessageCard from '../../components/chat/ChatMessageCard';

const ChatView = (props) => {
	return (
		<View style={{ flex: 1 }}>
			<ChatList chatId={'chats/33-A'} />
			<WhiteSpace />
			<View>
				<ChatInput chatId={'chats/33-A'} />
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
