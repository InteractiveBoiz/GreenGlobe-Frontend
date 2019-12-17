import React from 'react';
import { gql } from '@apollo/client';

export const CREATE_CHAT = gql`
	mutation createChat($chat: ChatInput!) {
		createChat(chat: $chat) {
			association
			members
			id
			messages {
				id
			}
		}
	}
`;

export const SEND_MESSAGE = gql`
	mutation sendMessage($id: ID!, $message: MessageInput!) {
		sendMessage(id: $id, message: $message) {
			messages {
				id
				messageDateTime
				owner
				text
			}
		}
	}
`;
