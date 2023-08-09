import { ContentfulProvider } from "@/context/contentful";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { client } from "./api/apolloClient";
import { JobsProvider } from "@/context/jobs";
import { ThemeProvider } from "@/context/theme";
import Nav from "@/components/nav";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <ContentfulProvider>
          <JobsProvider>
            <Nav />
            <Component {...pageProps} />
          </JobsProvider>
        </ContentfulProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
