import "@/styles/globals.css";
import Head from "next/head";
import NavBar from "@/components/Navbar";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/firebase/provider";
import { Provider } from 'react-redux';
import store from "@/src/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Head>
          <title>My Best Spots</title>
          <meta name="description" content="My Best Spots" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <Component {...pageProps} className="componentContainer" />
      </Provider>
    </AuthContextProvider>
  );
}
