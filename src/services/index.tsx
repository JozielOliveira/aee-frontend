import ApolloClient from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';

export const client = new ApolloClient({
  uri: `https://api-aee.herokuapp.com/graphql`,
  headers: {
    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTkwODY4NDQ5LCJleHAiOjE1OTM0NjA0NDl9.a3uRufs5fbPzT3rmDwn1iAMHN3Lnq-4Pg0VAjdfm8VI`
  },
  cache: new InMemoryCache()
});

export * from "./quiz";
export * from "./student";
