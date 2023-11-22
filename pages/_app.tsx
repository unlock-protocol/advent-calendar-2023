import { useEffect } from "react";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";
import { Meow_Script } from 'next/font/google'
 import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactGA.initialize("G-EEZ0EF7TJN");

// If loading a variable font, you don't need to specify the font weight
const meowScript = Meow_Script({ weight: "400", subsets: ['latin'] })
 


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    ReactGA.send("pageview");
  }, [router.asPath]);

  return <QueryClientProvider client={queryClient}>
    <canvas id="Snow" className="absolute	" />
    <Component {...pageProps} />
  </QueryClientProvider>

}
