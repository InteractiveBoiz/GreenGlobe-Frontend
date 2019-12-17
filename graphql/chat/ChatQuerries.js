import React from 'react';
import { gql } from '@apollo/client';

export const GET_CHAT = gql`
	query getChat($id: ID) {
		chat(id: $id) {
			messages {
				id
				messageDateTime
				owner
				text
			}
		}
	}
`;