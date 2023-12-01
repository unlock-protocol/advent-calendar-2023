import Head from "next/head";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";

import Header from "../components/Header";
import { Meow_Script } from 'next/font/google'
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Calendar } from "../components/Calendar";
// If loading a variable font, you don't need to specify the font weight
const meowScript = Meow_Script({ weight: "400", subsets: ['latin'] })


export default function Home() {
  const start = 1;
  const days = new Array(24).fill(0).map((d, i) => i + start);
  const searchParams = useSearchParams()
  
  const { data: now, isLoading } = useQuery({
    queryKey: ["now", searchParams.get('now')], queryFn: async () => {
    if (searchParams.get('now')) {
      return new Date(searchParams.get('now') as string)
    }
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.unlock-protocol.com/137"
    );
    const block = await provider.getBlock("latest");
    return new Date(block.timestamp * 1000);
  }});
  
  return (
    <>
      <Head>
        <title>2023 Unlock Advent Calendar</title>
        <meta
          property="og:title"
          content="2023 Unlock Advent Calendar"
          key="title"
        />
        <meta
          property="og:description"
          content="One NFT a day, fun gifts, and some year-in-review highlights — just for you! 
"
          key="description"
        />
        <meta
          property="og:image"
          content="https://advent.unlock-protocol.com/images/advent-2023.png"
        />
        <meta property="og:url" content="https://advent.unlock-protocol.com/" />
        <meta property="og:type" content="website" />
      </Head>

      <div className=" bg-black bg-[url('/images/background.svg')] bg-cover h-screen flex flex-col">
        <div className="bg-[url('/images/background.svg')] bg-cover ">
        <Header />
        <main className="container flex-1 flex flex-col gap-8 ">
          <div className="text-center text-white flex flex-col">
            <h1 className={`${meowScript.className} text-8xl bg-gradient-to-b text-transparent from-[#FCF6BA] to-[#BF953F] bg-clip-text `}>Advent Calendar</h1>
            <h2 className="text-3xl">By Unlock, December 2023</h2>
            <p>One NFT a day, fun gifts, and some year-in-review highlights — just for you!</p>
          </div>
          <Calendar />
        </main>
        <footer className="flex-shrink-0 pt-16 text-center text-white font-semibold  w-full pb-16 flex flex-col">
          <h3 className={`${meowScript.className} text-5xl`}>Wishing you a wonderful holiday season!</h3>
          <Link href="https://unlock-protocol.com/" className="mt-6 text-lg font-light">Unlock Labs. ♥</Link>
        </footer>
        </div>
      </div>
    </>
  );
}
