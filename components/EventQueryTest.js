import React from 'react';
import { Text, View } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { ATTENDING_EVENTS } from '../graphql/event/EventQuerries';
import client from '../graphql/Client'

function AddTodo () {
	const { loading, error, data } = useQuery(ATTENDING_EVENTS, {
		variables: {
			userId: 'user/1-C'
        },
        client: client
	});

	if (loading) return <Text>'Loading...'</Text>;
	if (error) return <Text>`Error! ${error.message}`</Text>;

	console.log(data);

	return <Text>{}</Text>;
};

export default AddTodo;
