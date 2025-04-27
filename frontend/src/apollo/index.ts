import { ApolloClient, InMemoryCache } from "@apollo/client";

export const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://127.0.0.1:3001/graphql",
    cache: new InMemoryCache(),
  });
};
