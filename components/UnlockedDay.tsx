import { useRouter } from "next/router";
import { useState } from "react";
import BaseDay from "./BaseDay";
import days from "../lib/days";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import makeItSnow from "../lib/snow";
interface UnlockedDayProps {
  day: number;
}

const UnlockedDay = ({ day }: UnlockedDayProps) => {
  const { query, replace } = useRouter();

  const [showModal, setShowModal] = useState(
    query && query.day && parseInt(query.day.toString(), 10) === day
  );
  const { title, description, link, image, youtube } = days[day - 1];

  if (query && query.day && parseInt(query.day.toString(), 10) === day) {
    makeItSnow();
    replace("/", undefined, { shallow: true });
  }
  return (
    <>
      <BaseDay day={day} onClick={() => setShowModal(true)}>
        <span className="w-full cursor-pointer absolute left-0 top-0 bottom-0 flex items-center justify-center text-7xl invisible group-hover:visible">
          🦌
        </span>
      </BaseDay>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
            <div className="relative w-auto mx-auto max-w-3xl">
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-red text-yellow outline-none focus:outline-none pt-5">
                <span
                  onClick={() => setShowModal(false)}
                  className="absolute text-xl px-4 py-3 right-0 top-0 text-white font-bold cursor-pointer"
                >
                  ✕
                </span>
                <div className="flex items-center justify-center text-2xl px-5 mb-3">
                  ❄️ ⛄ ❄️ 
                </div>
                <div className="flex items-start justify-between px-5">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                </div>
                {/*body*/}
                <div className="relative px-5 flex-auto">
                  <div className="my-4 text-lg leading-relaxed">
                    <ReactMarkdown skipHtml={false}>
                      {description!}
                    </ReactMarkdown>
                  </div>
                  {youtube && (
                    <div class="aspect-w-16 aspect-h-9">
                      <iframe
                        src={youtube}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  )}
                </div>
                <div className="container min-w-full flex flex-col items-center flex items-center justify-end pb-5 rounded-b">
                  {link && (
                    <Link
                      className="text-white font-bold py-2 px-4 mt-3 rounded"
                      href={link!}
                      target="_blank"
                    >
                      Learn more
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default UnlockedDay;
