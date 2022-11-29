import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const start = 0;
  const days = new Array(35).fill(0).map((d, i) => i + start);

  return (
    <main>
      <nav className="px-5 bg-gray-800">
        <div className="relative text-white flex h-16 items-center justify-end">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Connect Wallet
          </button>
        </div>
      </nav>
      <section className="px-5 ">
        <div className="bg-red">&nbsp;</div>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {days.map((day, index) => {
            if (day > 0 && day < 25) {
              return (
                <div className="day p-4 rounded-lg shadow-lg h-48 bg-red-500">
                  {day}
                </div>
              );
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
