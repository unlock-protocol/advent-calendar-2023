import Head from "next/head";
import Image from "next/image";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import Day from "../components/Day";
import Header from "../components/Header";

export default function Home() {
  const start = 0;
  const days = new Array(26).fill(0).map((d, i) => i + start);
  const { data: now, isLoading } = useQuery(["now"], async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.unlock-protocol.com/137"
    );
    const block = await provider.getBlock("latest");
    return new Date(block.timestamp * 1000);
  });

  return (
    <>
      <Head>
        <title>2022 Unlock Advent Calendar</title>
        <meta
          property="og:title"
          content="2022 Unlock Advent Calendar"
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
      </Head>

      <main className="bg-green">
        <div className="container">
          <Header />
          <section>
            <Image
              alt="hollidays"
              width="300"
              height="100"
              src="/images/header.svg"
            />
            <div className="mt-0 grid grid-cols-1 lg:grid-cols-7 gap-4 mb-12">
              {days.map((day, index) => {
                if (day > 0 && day < 25) {
                  return (
                    <Day
                      isLoading={isLoading}
                      now={now}
                      key={index}
                      day={day}
                    />
                  );
                }
                if (index === 0)
                  return (
                    <div
                      key={index}
                      className="day flex sm:h-36 lg:col-span-3 flex-col h-64"
                    >
                      <h1 className="text-4xl text-yellow font-semibold">
                        2022 Advent Calendar
                        <br /> presented by Unlock
                      </h1>
                      <p className="text-xl text-yellow font-light">
                        One NFT a day, fun gifts, and some year-in-review
                        highlights — just for you!
                      </p>
                    </div>
                  );
                return (
                  <div
                    key={index}
                    className="day flex items-center justify-center"
                  >
                    <Image
                      alt="cookie"
                      width="269"
                      height="209"
                      src="/images/cookie.svg"
                    />
                  </div>
                );
              })}
            </div>
          </section>
          <footer className="bg-[url('/images/footer.svg')] bg-repeat-x	pt-16 text-center text-white font-semibold text-4xl w-full pb-16 flex flex-col">
            Wishing you a wonderful holiday season!
            <span className="mt-6 text-lg font-light">Unlock Labs. ♥</span>
          </footer>
        </div>
      </main>
    </>
  );
}
