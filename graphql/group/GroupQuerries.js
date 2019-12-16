import React from 'react';
import { gql } from '@apollo/client';

export const GET_GROUP = gql`
	query group($id: ID!) {
		group(id: $id) {
			id
			name
			description
			privacy
			ownerId
			chatId
			members
		}
	}
`;

export const GET_GROUPS = gql`
	{
		groups {
			id
			name
			description
			privacy
			ownerId
			chatId
			members
		}
	}
`;
