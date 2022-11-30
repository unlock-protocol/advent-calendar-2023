import Head from "next/head";
import Image from "next/image";
import Day from "../components/Day";
import Header from "../components/Header";

export default function Home() {
  const start = 0;
  const days = new Array(26).fill(0).map((d, i) => i + start);

  return (
    <main className="bg-green">
      <div className="container">
        <Header />
        <section>
          <div className="grid pt-4 grid-cols-1 md:grid-cols-7 gap-4 mb-12">
            {days.map((day, index) => {
              if (day > 0 && day < 25) {
                return <Day key={index} day={day} />;
              }
              if (index === 0)
                return (
                  <div
                    key={index}
                    className="bg-[url('/images/header.svg')] bg-no-repeat	day flex h-36 md:col-span-3 flex-col pt-16"
                  >
                    <h1 className="text-4xl text-white font-semibold">
                      Advent Calendar
                      <br /> presented by Unlock
                    </h1>
                  </div>
                );
              return (
                <div key={index} className="day">
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
        <footer className="bg-[url('/images/footer.svg')] bg-repeat-x	pt-16 text-center text-white font-semibold text-4xl w-full pb-16">
          We wish you wonderful holidays.
        </footer>
      </div>
    </main>
  );
}
