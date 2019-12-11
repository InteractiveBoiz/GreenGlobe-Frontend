import React from 'react';
import { Text, View } from 'react-native';
import { Card, Button, InputItem, List } from '@ant-design/react-native';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { Query, Mutation } from 'react-apollo';
import UpdateUser from '../graphql/Profile/UpdateUser';
import UPDATE_USER from '../graphql/Profile/ProfileMutations';
import ProfileForm from './ProfileForm';


class Profile extends React.Component {
	state = {
		isEditing: false,
		user: {},
		userLoaded: false
	};

	handleClick() {
		this.setState(
			(prevState) => ({
				isEditing: !prevState.isEditing
			}),
			function() {
				console.log('Editing mode is:	' + this.state.isEditing);
			}
		);
	}

	sendData() {
		console.log('Sending data');
		var response = UpdateUser(this.state.user.id, this.state.user);
		console.log(response);
		console.log('Data has been sent!?');
	}

	render() {
		return (
			<ProfileForm/>
		);
	}
}

export default Profile;
