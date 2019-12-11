import React from 'react';
import { Text, View } from 'react-native';
import GET_USER from '../graphql/Profile/ProfileQuery';
import customClient from '../graphql/UserClient';
import { useQuery } from '@apollo/react-hooks';

function ProfileForm () {
	const { loading, error, data } = useQuery(GET_USER, {
		variables: {
				userId: 'user/1-C'
		},
		client: customClient
});


	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>`Error! ${error.message}`</Text>;

	return (
		<Text>Christian er flot</Text>
	);
}

export default ProfileForm;
