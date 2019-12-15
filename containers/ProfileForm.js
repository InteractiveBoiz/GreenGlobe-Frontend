import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Card, Button, InputItem, List, Picker } from '@ant-design/react-native';
import { GET_USER } from '../graphql/Profile/ProfileQuery';
import { UPDATE_USER } from '../graphql/Profile/ProfileMutations';
import customClient from '../graphql/UserClient';
import { useQuery, useMutation } from '@apollo/react-hooks';
import UserContext from '../contexts/UserContext';

function ProfileForm() {
	const { loading, error, data } = useQuery(GET_USER, {
		variables: {
			id: 'users/65-A'
		},
		client: customClient
	});
	const [ updateUser, { mutationData } ] = useMutation(UPDATE_USER, { client: customClient });

	const [ user, setUser ] = useState({});
	const [ userName, setUsername ] = useState('');
	const [ loaded, setloaded ] = useState(false);
	const [ isEditing, setIsEditing ] = useState(false);

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>`Error! ${error.message}`</Text>;

	if (!loaded) {
		setUser(data.User);
		setloaded(true);
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
						extra={value.user.name}
					/>
					<Card.Body>
						<List renderHeader={'Update User..'}>
							<InputItem
								clear
								defaultValue={data.user.username}
								editable={isEditing}
								onChange={(value) => {
									console.log(value);
									setUser({ ...user, username: value });
								}}
								placeholder={user != null ? data.user.username : 'no username'}
							>
								<Text style={{ fontSize: 12 }}>Username:</Text>
							</InputItem>
							<InputItem
								clear
								defaultValue={data.user.email}
								editable={isEditing}
								placeholder={data.user.email}
								onChange={(value) => {
									console.log(value);
									setUser({ ...user, email: value });
								}}
							>
								<Text style={{ fontSize: 12 }}>Email:</Text>
							</InputItem>
							<Picker
								clear
								data={userCategories}
								editable={isEditing}
								cols={1}
								defaultValue={data.user.userCategory}
								onChange={(value) => {
									setUser({ ...user, userCategory: value[0] });
								}}
								style={{ fontSize: 5 }}
							>
								<List.Item arrow="horizontal">
									{!isEditing ? data.user.userCategory : user.userCategory}
								</List.Item>
							</Picker>
							{!isEditing ? (
								<Button
									type="primary"
									onPress={() => {
										setIsEditing(true);
										setUser(data.user);
									}}
								>
									edit
								</Button>
							) : (
								<Button
									type="primary"
									onPress={() => {
										setIsEditing(false);
										console.log('user to send', user.username);
										updateUser({
											variables: {
												id: user.id,
												user: {
													username: user.username,
													email: user.email,
													userCategory: user.userCategory
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
						<Text style={{ marginLeft: 16 }}>{data.user.id}</Text>
						<Text style={{ marginLeft: 16 }}>{data.user.isVerified}</Text>
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
