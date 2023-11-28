import Head from "next/head";
import Image from "next/image";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import Day from "../components/Day";
import Header from "../components/Header";
import { Meow_Script } from 'next/font/google'
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
// If loading a variable font, you don't need to specify the font weight
const meowScript = Meow_Script({ weight: "400", subsets: ['latin'] })


console.log("Starting advent calendar", process.env.VERCEL_ENV)

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
          content="https://advent.unlock-protocol.com/images/advent.png"
        />
        <meta property="og:url" content="https://advent.unlock-protocol.com/" />
        <meta property="og:type" content="website" />
      </Head>

      <div className=" bg-black bg-[url('/images/background.svg')] bg-cover h-screen flex flex-col">
        <Header />
        <main className="container flex-1 flex flex-col gap-8">
            <div className="text-center text-white flex flex-col">
            <h1 className={`${meowScript.className} text-8xl bg-gradient-to-b text-transparent from-[#FCF6BA] to-[#BF953F] bg-clip-text `}>Advent Calendar</h1>
            <h2 className="text-3xl">By Unlock, December 2023</h2>
            <p>One NFT a day, fun gifts, and some year-in-review highlights — just for you!</p>
            </div>
            <div className="place-content-center grid grid-cols-1 sm:grid-cols-[repeat(7,72px)] gap-4 my-8">
            <div className="sm:col-span-4" />
            {days.map((day, index) => {
              if (day > 0 && day < 25) {
                return (
                  <div className="flex flex-col items-center	" key={index}>
                    <Day
                      isLoading={isLoading}
                      now={now}
                      day={day}
                    />
                  </div>
                );
              }
            })}
            </div>
        </main>
        <footer className="flex-shrink-0 pt-16 text-center text-white font-semibold  w-full pb-16 flex flex-col">
          <h3 className={`${meowScript.className} text-5xl`}>Wishing you a wonderful holiday season!</h3>
          <span className="mt-6 text-lg font-light">Unlock Labs. ♥</span>
        </footer>
      </div>
    </>
  );
}
