import React,{ useState } from 'react';
import { Text } from 'react-native';
import { Card, InputItem, Button, List } from '@ant-design/react-native';
import { USER_LOGIN } from '../../graphql/Profile/ProfileQuery';
import customClient from '../../graphql/UserClient';
import { useLazyQuery } from '@apollo/react-hooks';
import UserContext from '../../contexts/UserContext';

const LoginForm = () => {
	/*const { loading, error, data } = useLazyQuery(GET_USER, {
		variables: {
			id: 'users/65-A'
		},
		client: customClient
	});*/
	const [ username, setUsername ] = useState('');
	const [ userPassword, setPassword ] = useState('');
	const [ userLogin, { loading, error, data } ] = useLazyQuery(USER_LOGIN, {
		client: customClient
	});

	console.log("User: ", data);

	return (
		<Card full>
			<Card.Body>
				<List renderHeader={'Login'}>
					<InputItem
						clear
						onChange={(value) => {
							console.log(value);
							setUsername(value);
						}}
						placeholder={'username...'}
					>
						<Text style={{ fontSize: 12 }}>Username:</Text>
					</InputItem>
					<InputItem
						clear
						onChange={(value) => {
							console.log(value);
							setPassword(value);
						}}
						placeholder={'password...'}
					>
						<Text style={{ fontSize: 12 }}>Password:</Text>
					</InputItem>
					<Button
						type="primary"
						onPress={() => {
							userLogin({
								variables: {
									username: username,
									password: userPassword
								}
							})
						}}
					>
						Login
					</Button>
				</List>
			</Card.Body>
		</Card>
	);
};

export default LoginForm;
