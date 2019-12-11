import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Card, Button, InputItem, List } from '@ant-design/react-native';
import { GET_USER } from '../graphql/Profile/ProfileQuery';
import { UPDATE_USER } from '../graphql/Profile/ProfileMutations';
import customClient from '../graphql/UserClient';
import { useQuery, useMutation } from '@apollo/react-hooks';

function ProfileForm() {
	const { loading, error, data } = useQuery(GET_USER, {
		variables: {
			id: '02f8b65c-512d-4366-ae64-cfafce8dc24e'
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
		<Card full>
			<Card.Header
				title="ProfileTitle"
				thumbStyle={{ width: 30, height: 30 }}
				thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
				extra="Verified"
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
					<InputItem
						clear
						defaultValue={data.user.userCategory}
						editable={isEditing}
						placeholder={data.user.userCategory}
					>
						<Text style={{ fontSize: 12 }}>UserCategory:</Text>
					</InputItem>

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
											email: user.email
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
	);
}

export default ProfileForm;
