import ApolloClient from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';

export const client = new ApolloClient({
  uri: process.env.API_URL,
  headers: {
    "Authorization": `Bearer ${process.env.AUTH_TOKEN}`
  },
  cache: new InMemoryCache()
});

export * from "./quiz";
