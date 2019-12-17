import React, { useState } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import ChatMessageCard from '../../components/chat/ChatMessageCard';
import { GET_CHAT } from '../../graphql/chat/ChatQuerries';
import { useQuery } from 'react-apollo';
import client from '../../graphql/ChatClient';

const ChatList = (props) => {
	//const [ chatData, setChatData ] = useState([]);
	const { loading, error, data, refetch, networkStatus } = useQuery(GET_CHAT, {
		variables: {
			id: props.chatId
		},
		notifyOnNetworkStatusChange: true,
		pollInterval: 500,
		client: client
	});

	var chatData = [];
	if (data !== undefined) {
        chatData = data.chat.messages;
        chatData = chatData.slice().reverse()
	}

	//if (loading) return <Text>Loading...</Text>;
	//if (error) return <Text>`Error! ${error.message}`</Text>;
	console.log('chat data data', data);
	console.log('chat data', chatData);

	return (
		<SafeAreaView style={styles.container}>
			{chatData.length !== 0 ? (
				<FlatList
					inverted
					data={chatData}
					renderItem={(message) => <ChatMessageCard message={message.item} />}
					keyExtractor={(message) => message.id}
					refreshing={networkStatus === 4}
					onRefresh={() => refetch()}
				/>
			) : (
				<Text>No Messages in Chat</Text>
			)}
		</SafeAreaView>
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

export default ChatList;
