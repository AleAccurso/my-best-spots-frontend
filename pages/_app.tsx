import "@/styles/globals.css";
import Head from "next/head";
import NavBar from "@/components/Navbar";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/firebase/provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Head>
        <title>My Places</title>
        <meta name="description" content="My Locations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
