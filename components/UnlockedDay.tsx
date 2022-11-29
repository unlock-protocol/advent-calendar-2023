import { useState } from "react";
import BaseDay from "./BaseDay";

interface UnlockedDayProps {
  day: number;
}

const UnlockedDay = ({ day }: UnlockedDayProps) => {
  const [showModal, setShowModal] = useState(false);
  const title = "Dot dot dot";
  const description =
    "We did this really cool thing! We did this really cool thing! We did this really cool thing! We did this really cool thing! We did this really cool thing! We did this really cool thing! We did this really cool thing!";
  return (
    <>
      <BaseDay day={day} onClick={() => setShowModal(true)}>
        <span className="cursor-pointer  w-full absolute left-0 top-0 bottom-0 flex items-center justify-center text-3xl invisible group-hover:visible text-white font-bold py-2 px-4 rounded bg-yellow-500">
          Open!
        </span>
      </BaseDay>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    {description}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="w-full text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
  return (
    <>
      <div
        className="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      ></div>
      <BaseDay day={day}>
        <span className="cursor-pointer  w-full absolute left-0 top-0 bottom-0 flex items-center justify-center text-3xl invisible group-hover:visible text-white font-bold py-2 px-4 rounded bg-yellow-500">
          Open!
        </span>
      </BaseDay>
    </>
  );
};

export default UnlockedDay;
