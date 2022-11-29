import Head from "next/head";
import Image from "next/image";
import Day from "../components/Day";
import Header from "../components/Header";

export default function Home() {
  const start = 0;
  const days = new Array(35).fill(0).map((d, i) => i + start);

  return (
    <main>
      <Header />
      <section className="px-5 ">
        <div className="grid pt-4 grid-cols-1 md:grid-cols-7 gap-4">
          {days.map((day, index) => {
            if (day > 0 && day < 25) {
              return <Day key={index} day={day} />;
            }
            if (index === 0)
              return (
                <div className="day text-gray-800 flex justify-center items-center h-48 text-center md:col-span-3 justify-center items-center justify-self-auto">
                  <h1 className="text-5xl font-semibold">
                    Unlock's Advent Calendar!
                  </h1>
                </div>
              );
            return <div className="day" />;
          })}
        </div>
      </section>
    </main>
  );
}
