import React from 'react';
import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
	mutation updateUser($id: ID! $user: UserInput!) {
		updateUser(id: $id, user: $user) {
			id
			email
			username
		}
	}
`;
