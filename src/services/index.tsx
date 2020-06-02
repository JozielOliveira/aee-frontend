import ApolloClient from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';

export const client = new ApolloClient({
  uri: `http://localhost:1337/graphql`,
  headers: {
    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTkwMjczNjgxLCJleHAiOjE1OTI4NjU2ODF9.pzb92mBhGbgZSumCFHlOuhnZlzqYTdb863smsS5vFtQ`
  },
  cache: new InMemoryCache()
});

export * from "./quiz";
export * from "./student";
