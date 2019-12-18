import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    //uri: 'https://localhost:44384/api/Event/',
    uri: 'http://10.0.2.2:5003/api/groups/'
  })
});

export default client