import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const client = new QueryClient();
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
