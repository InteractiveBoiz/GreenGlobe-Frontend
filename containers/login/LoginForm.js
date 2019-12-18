import React,{ useState, useContext } from 'react';
import { Text } from 'react-native';
import { Card, InputItem, Button, List } from '@ant-design/react-native';
import { USER_LOGIN, GET_USER } from '../../graphql/Profile/ProfileQuery';
import customClient from '../../graphql/UserClient';
import { useLazyQuery } from '@apollo/react-hooks';
import UserContext from '../../contexts/UserContext';
import { withNavigation } from 'react-navigation';

const LoginForm = (props) => {
	/*const { loading, error, data } = useLazyQuery(GET_USER, {
		variables: {
			id: 'users/65-A'
		},
		client: customClient
	});*/
	const [ username, setUsername ] = useState('');
	const [ isLoggedIn, setIsLoggedIn ] = useState(false);
	const [ userPassword, setPassword ] = useState('');
	const [ userLogin, { loading, error, data } ] = useLazyQuery(USER_LOGIN, {
		client: customClient
	});
	const [ developmentUserLogin, { data: developmentData } ] = useLazyQuery(GET_USER, {
		client: customClient
	});

	console.log("User: ", data);
	if(data != undefined && !isLoggedIn){
		setIsLoggedIn(true);
		const contextValue = useContext(UserContext);
		contextValue.login(data.userLogin)
		props.navigation.navigate('Home')

	}
	else if(developmentData != undefined && !isLoggedIn){
		setIsLoggedIn(true);
		const contextValue = useContext(UserContext);
		contextValue.login(developmentData.user)
		props.navigation.navigate('Home')

	}

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
					<Button
						type="primary"
						onPress={() => {
							developmentUserLogin({
								variables: {
									id: 'users/1-A',
								}
							})
						}}
					>
						Development Login
					</Button>
				</List>
			</Card.Body>
		</Card>
	);
};

export default withNavigation(LoginForm);
