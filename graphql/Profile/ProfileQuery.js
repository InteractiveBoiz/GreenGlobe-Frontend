import React from 'react';
import { gql } from '@apollo/client';

export const GET_USER = gql`
	query user($id: ID!) {
		user(id: $id) {
			id
			password
			email
			username
			groupsList
			friendsList
			isVerified
			userCategory
		}
	}
`;

export const USER_LOGIN = gql`
	query userLogin($username: String!, $password: String!) {
		userLogin(username: $username, password: $password) {
			id
			password
			email
			username
			groupsList
			friendsList
			isVerified
			userCategory
		}
	}
`;

export const GET_USER2 = gql`
	{
		user(id: "02f8b65c-512d-4366-ae64-cfafce8dc24e") {
			id
			username
			email
			isVerified
			userCategory
		}
	}
`;
