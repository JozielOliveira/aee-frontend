import ApolloClient from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';

export const client = new ApolloClient({
  uri: `https://api-aee.herokuapp.com/graphql`,
  cache: new InMemoryCache(),
  request: ({ setContext }) => {
    setContext(({ headers }: any) => {
      const token = localStorage.getItem('token');
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    })
  }
});
