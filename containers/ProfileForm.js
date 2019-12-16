import React, { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { Card, Button, InputItem, List, Picker } from '@ant-design/react-native';
import { GET_USER } from '../graphql/Profile/ProfileQuery';
import { UPDATE_USER } from '../graphql/Profile/ProfileMutations';
import customClient from '../graphql/UserClient';
import { useQuery, useMutation } from '@apollo/react-hooks';
import UserContext from '../contexts/UserContext';
import Profile from './Profile';

function ProfileForm() {
	
	const [ updateUser, { data: mutationData } ] = useMutation(UPDATE_USER, { client: customClient });

	const [ user, setUser ] = useState({});
	const [ userName, setUsername ] = useState('');
	const [ loaded, setLoaded ] = useState(false);
	const [ isEditing, setIsEditing ] = useState(false);
	
	console.log(loaded, mutationData)
	if(mutationData != undefined && loaded){
		console.log('Reached this if statement!')
		setLoaded(false)
		const contextValue = useContext(UserContext);
		contextValue.login(user)
	}

	console.log(user);

	return (
		<UserContext.Consumer>
			{(value) => (
				<Card full>
					<Card.Header
						title="ProfileTitle"
						thumbStyle={{ width: 30, height: 30 }}
						thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
						extra={value.user.isVerified}
					/>
					<Card.Body>
						<List renderHeader={'Update User..'}>
							<InputItem
								clear
								defaultValue={value.user.username}
								editable={isEditing}
								onChange={(value) => {
									console.log(value);
									setUser({ ...user, username: value });
								}}
								placeholder={user != null ? value.user.username : 'no username'}
							>
								<Text style={{ fontSize: 12 }}>Username:</Text>
							</InputItem>
							<InputItem
								clear
								defaultValue={value.user.email}
								editable={isEditing}
								placeholder={value.user.email}
								onChange={(value) => {
									console.log(value);
									setUser({ ...user, email: value });
								}}
							>
								<Text style={{ fontSize: 12 }}>Email:</Text>
							</InputItem>
							<InputItem
								clear
								defaultValue={value.user.password}
								editable={isEditing}
								placeholder={value.user.password}
								onChange={(value) => {
									console.log(value);
									setUser({ ...user, password: value });
								}}
							>
								<Text style={{ fontSize: 12 }}>Password:</Text>
							</InputItem>
							<Picker
								clear
								data={userCategories}
								editable={isEditing}
								cols={1}
								defaultValue={value.user.userCategory}
								onChange={(value) => {
									setUser({ ...user, userCategory: value[0] });
								}}
								style={{ fontSize: 5 }}
							>
								<List.Item arrow="horizontal">
									{!isEditing ? value.user.userCategory : user.userCategory}
								</List.Item>
							</Picker>
							{!isEditing ? (
								<Button
									type="primary"
									onPress={() => {
										setIsEditing(true);
										setUser(value.user);
									}}
								>
									edit
								</Button>
							) : (
								<Button
									type="primary"
									onPress={() => {
										setIsEditing(false);
										setLoaded(true);
										console.log('user to send', user.username)
		
										updateUser({
											variables: {
												id: user.id,
												user: {
													username: user.username,
													email: user.email,
													userCategory: user.userCategory,
													password: user.password
												}
											}
										})
											.then((res) => console.log(res))
											.catch((err) => console.log(err));
									}}
								>
									save
								</Button>
							)}
						</List>
						<Text style={{ marginLeft: 16 }}>{value.user.id}</Text>
						<Text style={{ marginLeft: 16 }}>{value.user.isVerified}</Text>
					</Card.Body>
				</Card>
			)}
		</UserContext.Consumer>
	);
}

const userCategories = [
	{ value: 'User', label: 'User' },
	{ value: 'Organisation', label: 'Organisation' },
	{ value: 'NonUser', label: 'Non-user' }
];

export default ProfileForm;
