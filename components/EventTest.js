import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '@ant-design/react-native';
import { useMutation } from '@apollo/react-hooks';
import { ATTEND_EVENT } from '../graphql/event/EventMutations';

const AddTodo = () => {
	const [ addTodo, { data } ] = useMutation(ATTEND_EVENT);

	return (
		<Button
			type="primary"
			onPress={() => {
				addTodo({
					variables: {
						userId: 'user/1-C',
						eventId: 'events/34-A'
					}
				})
					.then((res) => console.log(res))
					.catch((err) => <Text>{err}</Text>);
			}}
		>
			Participate
		</Button>
	);
};

export default AddTodo;
