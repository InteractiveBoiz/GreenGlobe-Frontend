import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { InputItem, Button } from '@ant-design/react-native';
import { useMutation } from 'react-apollo';
import { SEND_MESSAGE } from '../../graphql/chat/ChatMutations';
import client from '../../graphql/ChatClient';
import UserContext from '../../contexts/UserContext';

const ChatInput = (props) => {
	const userContext = useContext(UserContext);
	const [ textInput, setTextInput ] = useState('');
	const [ sendMessage, { loading: sendMessageLoading, error: sendMessageError } ] = useMutation(SEND_MESSAGE, {
		client: client
	});

	return (
		<View>
			<InputItem
				clear
				value={textInput}
				onChange={(value) => {
					setTextInput(value);
				}}
				placeholder="Message.."
			>
				<Text style={{ fontSize: 12 }}>Message:</Text>
			</InputItem>
			<Button
				type="primary"
				onPress={() => {
					Keyboard.dismiss();
					sendMessage({
						variables: {
							id: props.chatId,
							message: {
								messageDateTime: new Date(),
								owner: userContext.user.id,
								text: textInput
							}
						}
					})
						.then((res) => {
							console.log(res);
							setTextInput('');
						})
						.catch((err) => <Text>{err}</Text>);
				}}
			>
				Send
			</Button>
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

export default ChatInput;
