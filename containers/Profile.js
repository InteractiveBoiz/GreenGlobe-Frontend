import React from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from '@ant-design/react-native';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { Query } from 'react-apollo';

const customClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'http:10.0.2.2:5000/api/users'
	})
});



const GET_USER = gql`
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

class Profile extends React.Component {
	render() {
		return (
			
				<Query query={GET_USER} client={customClient}>
					{({ loading, error, data }) => {
						if (loading) return <Text>Loading...</Text>;
						if (error) return <Text>Error! {error.message}</Text>;

						return (
							<View>
							<Card full>
								<Card.Header
									title="ProfileTitle"
									thumbStyle={{ width: 30, height: 30 }}
									thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
									extra="Verified"
								/>
								<Card.Body>
									<View style={{ height: 42 }}>
										<Text style={{ marginLeft: 16 }}>{data.user.username}</Text>
										<Text style={{ marginLeft: 16 }}>{data.user.email}</Text>
										<Text style={{ marginLeft: 16 }}>{data.user.userCategory}</Text>
										<Text style={{ marginLeft: 16 }}>{data.user.id}</Text>
										<Text style={{ marginLeft: 16 }}>{data.user.isVerified}</Text>
									</View>
								</Card.Body>
							</Card>
							<Button type="primary">edit</Button>
							</View>
						);
					}}
				</Query>
			
		);
	}
}

export default Profile;
