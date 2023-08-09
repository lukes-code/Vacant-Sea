import { ApolloClient, InMemoryCache } from "@apollo/client";

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${spaceId}?access_token=${accessToken}`,
  headers: {
    "Content-Type": "application/json",
  },
  cache: new InMemoryCache(),
});
