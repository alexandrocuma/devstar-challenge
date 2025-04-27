"use client";

import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "@/apollo";

export const LayoutComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const client = createApolloClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
