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
  isFutureDay: boolean;
}

const LastDay = ({ user, day, isFutureDay }: LastDayProps) => {
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

  if ((!previousDayMembership && !query.debug) || isFutureDay) {
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto">
              <div className="relative flex flex-col w-full pt-5 rounded-lg shadow-lg outline-none bg-red text-yellow focus:outline-none">
                <span
                  onClick={() => setShowModal(false)}
                  className="absolute top-0 right-0 px-4 py-3 text-xl font-bold text-white cursor-pointer"
                >
                  ✕
                </span>
                <div className="flex items-center justify-center px-5 mb-3 text-2xl">
                  ❄️ ⛄ ❄️ 
                </div>
                <div className="flex items-start justify-between px-5">
                  <h3 className="text-3xl font-semibold">
                    Spreading holiday cheer!
                  </h3>
                </div>
                {/*body*/}
                <div className="relative flex-auto px-5 mb-6">
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
                <div className="container flex flex-row items-center justify-center min-w-full pb-5 space-x-2 rounded-b">
                  <button
                    className="px-4 py-2 mt-3 font-bold text-white border rounded whitespace-nowrap"
                    onClick={checkout}
                  >
                    Look under the tree!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
        </>
      ) : null}
      <BaseDay onClick={() => setShowModal(true)} day={day}>
        <span className="absolute top-0 bottom-0 left-0 flex items-center justify-center invisible w-full cursor-pointer text-7xl group-hover:visible">
          🎁
        </span>
      </BaseDay>
    </>
  );
};

export default LastDay;
