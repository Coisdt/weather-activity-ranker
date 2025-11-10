import React from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

/**
 * Creates a minimal Apollo Client instance for testing
 */
export const createTestClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: "http://localhost:4000" }),
  });
};

/**
 * Creates a React wrapper component with Apollo Provider for testing hooks
 */
export const createApolloWrapper = (client: ApolloClient) => {
  return ({ children }: { children: React.ReactNode }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  );
};
