import { ContentfulProvider } from "@/context/contentfulContext";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { client } from "./api/apolloClient";
import { JobsProvider } from "@/context/jobsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ContentfulProvider>
        <JobsProvider>
          <Component {...pageProps} />
        </JobsProvider>
      </ContentfulProvider>
    </ApolloProvider>
  );
}
