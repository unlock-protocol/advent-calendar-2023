/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseDay from "./BaseDay";
import days from "../lib/days";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import snow from "../lib/snow";
import { BsTwitter } from "react-icons/bs";
import { SlMagnifier } from "react-icons/sl";
import { ethers } from "ethers";
import isWinner from "../lib/getWinners";
interface UnlockedDayProps {
  day: number;
  user: any;
  justUnlocked?: boolean;
}

interface ModalProps {
  user: any;
  day: number;
  setShowModal: (show: boolean) => void;
}

interface Content {
  title?: string;
  description?: string;
  image?: string;
  youtube?: string;
  link?: string;
}

const Modal = ({ day, setShowModal, user }: ModalProps) => {
  const [content, setContent] = useState<Content | null>(null);
  const tweetIntent = new URL("https://twitter.com/intent/tweet");
  tweetIntent.searchParams.set(
    "text",
    `🎁 I have just unlocked Day ${day} of the @UnlockProtocol advent calendar!`
  );
  tweetIntent.searchParams.set("url", "https://advent.unlock-protocol.com");

  useEffect(() => {
    const checkStatus = async () => {
      if (day == 24) {
        const day24 = {
          title: "A special something for some special Locksmiths",
          description:
            "Unfortunately, you have not won a gift. :( That said, thank you so much for being part of Unlock’s 2022, please do stay in touch, and wishing you a prosperous 2023.",
          image: "/images/advent-day24.png",
        };
        // check if user is winner!
        const winner = await isWinner(user);
        if (winner > -1) {
          day24.description =
            "We are giving away a few special gifts to three members of the community from Ledger and other friends and — 🍾 congrats, you are one of the winners! Our team will be in touch with you via email with details in the next few days.";
        }

        setContent(day24);
      } else {
        setContent(days[day - 1]);
      }
    };
    checkStatus();
  }, [day]);

  if (!content) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
        <div className="relative w-auto mx-auto max-w-3xl  bg-[url('/images/modal-background.png')] rounded-2xl border-8">
          <div className="rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none p-8 ">
            
            {/*body*/}
            <div className="relative flex-auto text-white">
              <div className="rounded-2xl overflow-hidden">
              {content.image && (
                <div className="aspect-w-16 aspect-h-9">
                  <img alt="money" src={content.image} />
                </div>
              )}
              {content.youtube && (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={content.youtube}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              </div>
              <h3 className="text-3xl mt-8 font-semibold">{content.title}</h3>
              <div className="my-4 text-lg leading-relaxed">
                {day == 24 && (
                  <p className="my-4 text-lg leading-relaxed">
                    🙏 Thank you for being part of the Unlock Protocol community
                    this year!
                  </p>
                )}
                <ReactMarkdown className="markdown" skipHtml={false}>
                  {content.description!}
                </ReactMarkdown>
                {day == 24 && (
                  <p className="my-4 text-lg leading-relaxed text-sm">
                    Please see the{" "}
                    <Link
                      target="_blank"
                      className="underline"
                      href="https://unlockprotocol.notion.site/Unlock-Contests-and-Sweepstakes-Standard-Terms-and-Conditions-1e00ab3d30f24a8fb350a561fddc9f66"
                    >
                      official rules
                    </Link>{" "}
                    for country and other eligibility.
                  </p>
                )}
              </div>
            </div>
            <div className="container space-x-2 min-w-full flex-row flex items-center justify-center rounded-b">
              {content.link && (
                <Link
                  className="border bg-white text-black font-bold py-2 px-4 mt-3 rounded whitespace-nowrap "
                  href={content.link!}
                  target="_blank"
                >
                  <SlMagnifier className="inline-block mr-2" />
                  Learn more
                </Link>
              )}
              <Link
                target="_blank"
                className="border whitespace-nowrap bg-white text-black font-bold py-2 px-4 mt-3 rounded"
                href={tweetIntent.toString()}
              >
                <BsTwitter className="inline-block mr-2" />
                Tweet this
              </Link>
            </div>
          </div>

          <div className="container space-x-2 min-w-full flex-row flex items-center justify-center my-8">
            <span
              onClick={() => setShowModal(false)}
              className="text-lg text-white cursor-pointer"
            >
              Close
            </span>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black "></div>
    </>
  );
};

const UnlockedDay = ({ user, day, justUnlocked }: UnlockedDayProps) => {
  const [showModal, setShowModal] = useState(justUnlocked);
  
  useEffect(() => {
    if(justUnlocked) {
      snow.start();
    }
  }, [justUnlocked])

  return (
    <>
      <BaseDay outterClasses="bg-[#282A2D] border-[#75797E] text-white cursor-pointer" day={day} onClick={() => {
        setShowModal(true)}
      } />
      {showModal ? (
        <Modal user={user} day={day} setShowModal={(showModal) => {
          snow.stop()
          setShowModal(showModal)
        }} />
      ) : null}
    </>
  );
};

export default UnlockedDay;
