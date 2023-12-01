import { useEffect } from "react";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";


import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Provider from "../lib/Provider";

ReactGA.initialize("G-EEZ0EF7TJN");


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    ReactGA.send("pageview");
  }, [router.asPath]);

  return <Provider>
    <canvas id="Snow" className="absolute" />
    <Component {...pageProps} />
  </Provider>

}
