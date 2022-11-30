import { useState } from "react";
import BaseDay from "./BaseDay";

interface UnlockedDayProps {
  day: number;
}

const UnlockedDay = ({ day }: UnlockedDayProps) => {
  const [showModal, setShowModal] = useState(false);
  const title = "Welcome to the 2022 Unlock Protocol Advent Calendar! ";
  const description =
    "Every day, open a new door, claim a new NFT, and learn something new! You can open today’s door if you opened yesterday’s door. (No peeking ahead!) Best of all, some days will have special gifts for you from Unlock!";
  return (
    <>
      <BaseDay day={day} onClick={() => setShowModal(true)}>
        <span className="w-full cursor-pointer absolute left-0 top-0 bottom-0 flex items-center justify-center text-7xl invisible group-hover:visible">
          🦌
        </span>
      </BaseDay>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto mx-auto max-w-3xl">
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-red text-yellow outline-none focus:outline-none pt-5">
                <div className="flex items-center justify-center text-2xl px-5 mb-3">
                  ❄️ ⛄ ❄️ 
                </div>
                <div className="flex items-start justify-between px-5">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                </div>
                {/*body*/}
                <div className="relative px-5 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    {description}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end pb-5 rounded-b">
                  <button
                    className="w-full background-transparent font-bold text-white px-6 py-2 text-sm"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
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
