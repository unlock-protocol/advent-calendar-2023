import { Analytics } from '@vercel/analytics/react';

import Head from "next/head";

import Header from "../components/Header";
import { Meow_Script } from 'next/font/google'
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Calendar } from "../components/Calendar";
import { AppConfig } from "../lib/AppConfig";
import { GetTokens } from "../components/GetTokens";
// If loading a variable font, you don't need to specify the font weight
const meowScript = Meow_Script({ weight: "400", subsets: ['latin'] })


export default function Home() {
  const start = 1;
  const days = new Array(24).fill(0).map((d, i) => i + start);
  const searchParams = useSearchParams()

  
  return (
    <>
      <Head>
        <title>2023 Unlock Advent Calendar</title>
        <meta
          property="og:title"
          content={AppConfig.name}
          key="title"
        />
        <meta
          property="og:description"
          content={AppConfig.description}
          key="description"
        />
        <meta
          property="og:image"
          content={`${AppConfig.siteUrl}/images/advent-2023.png`}
        />
        <meta property="og:url" content={AppConfig.siteUrl} />
        <meta property="og:type" content="website" />

        <meta property="eth:nft:collection" content={AppConfig.name} />
        {/* Day1 contract address */}
        <meta property="eth:nft:contract_address" content="0x31291b6bccc00e4c10c769746671448498fea2d7" />
        <meta
          property="eth:nft:creator_address"
          content="unlock-protocol.eth"
        />
        <meta property="eth:nft:mint_url" content={AppConfig.siteUrl} />
        <meta property="eth:nft:mint_status" content="live" />
        <meta property="eth:nft:schema" content="erc721" />
        <meta property="eth:nft:chain" content="base" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/png" />

      </Head>

      <div className=" bg-black bg-[url('/images/background.svg')] bg-cover h-screen flex flex-col">
        <div className="bg-[url('/images/background.svg')] bg-cover ">
        <Header />
        <main className="container relative flex-1 flex flex-col gap-4">
          <div className="text-center text-white flex flex-col">
            <h1 className={`${meowScript.className} text-8xl bg-gradient-to-b text-transparent from-[#FCF6BA] to-[#BF953F] bg-clip-text `}>Advent Calendar</h1>
            <h2 className="text-3xl">By Unlock, December 2023</h2>
            <p>One NFT a day, fun gifts, and some year-in-review highlights — just for you!</p>
          </div>
          <GetTokens />
          <Calendar />
        </main>
        <footer className="flex-shrink-0 relative pt-16 text-center text-white font-semibold  w-full pb-16 flex flex-col">
          <h3 className={`${meowScript.className} text-5xl`}>Wishing you a wonderful holiday season!</h3>
          <Link href="https://unlock-protocol.com/" className="mt-6 text-lg font-light">Unlock Labs. ♥</Link>
        </footer>
        </div>
      </div>
      <Analytics />      
    </>
  );
}
