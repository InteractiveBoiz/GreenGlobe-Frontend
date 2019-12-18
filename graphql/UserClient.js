import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const customClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'http:10.0.2.2:5004/api/users'
	})
});

export default customClient;
