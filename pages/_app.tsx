import { useEffect } from "react";
import { hotjar } from "react-hotjar";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactGA.initialize("G-EEZ0EF7TJN");


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!hotjar.initialized()) {
      hotjar.initialize(3280275, 6);
    }
  }, []);

  useEffect(() => {
    if (hotjar.initialized()) {
      hotjar.stateChange(router.asPath);
    }
    ReactGA.send("pageview");
  }, [router.asPath]);

  return <QueryClientProvider client={queryClient}>
    <canvas id="Snow" className="absolute	" />
    <Component {...pageProps} />
  </QueryClientProvider>

}
