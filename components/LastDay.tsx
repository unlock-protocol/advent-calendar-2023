import { useLock } from "../hooks/useLock";
import UnlockedDay from "./UnlockedDay";
import LoadingDay from "./LoadingDay";
import BaseDay from "./BaseDay";
import FutureDay from "./FutureDay";
import { useAuth } from "../hooks/useAuth";
import days from "../lib/days";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface LastDayProps {
  user: string;
  day: number;
}

const LastDay = ({ user, day }: LastDayProps) => {
  const [showModal, setShowModal] = useState(false);
  const { query } = useRouter();

  const {
    hasMembership: previousDayMembership,
    isLoading: previousDayLoading,
  } = useLock(user, day - 1);
  const { purchase } = useAuth();

  const { hasMembership, isLoading } = useLock(user, day);

  if (isLoading || previousDayLoading) {
    return <LoadingDay day={day} />;
  }

  if (!previousDayMembership && !query.debug) {
    return <FutureDay day={day} />;
  }

  if (hasMembership) {
    return <UnlockedDay day={day} user={user} />;
  }

  const checkout = () => {
    purchase(
      {
        locks: {
          [days[day - 1].lock]: {
            network: 137,
            emailRequired: true,
            metadataInputs: [
              {
                name: "Country of Residence",
                type: "text",
                required: true,
              },
            ],
          },
        },
        pessimistic: true,
      },
      { day: day.toString() }
    );
  };

  return (
    <>
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
                  <h3 className="text-3xl font-semibold">
                    Spreading holiday cheer!
                  </h3>
                </div>
                {/*body*/}
                <div className="relative px-5 flex-auto mb-6">
                  <p className="my-4 text-lg leading-relaxed">
                    Today is a bit special, and we have some special gifts for a
                    few Locksmiths!
                  </p>
                  <p>
                    Unlock the last day, and a few lucky Locksmiths will get
                    something special! (See the{" "}
                    <Link
                      className="underline"
                      target="_blank"
                      href="https://unlockprotocol.notion.site/Unlock-Contests-and-Sweepstakes-Standard-Terms-and-Conditions-1e00ab3d30f24a8fb350a561fddc9f66"
                    >
                      official rules
                    </Link>
                    . )
                  </p>
                </div>
                <div className="container space-x-2  min-w-full flex flex-row items-center flex items-center justify-center pb-5 rounded-b">
                  <button
                    className="border whitespace-nowrap	 text-white font-bold py-2 px-4 mt-3 rounded"
                    onClick={checkout}
                  >
                    Look under the tree!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <BaseDay onClick={() => setShowModal(true)} day={day}>
        <span className="cursor-pointer w-full absolute left-0 top-0 bottom-0 flex items-center justify-center text-7xl invisible group-hover:visible">
          🎁
        </span>
      </BaseDay>
    </>
  );
};

export default LastDay;
