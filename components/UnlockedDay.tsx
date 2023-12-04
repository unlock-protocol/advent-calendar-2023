/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BaseDay from "./BaseDay";
import days from "../lib/days";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import snow from "../lib/snow";
import { BsTwitter } from "react-icons/bs";
import { SlMagnifier } from "react-icons/sl";
import { SiOpensea } from "react-icons/si";

import { useContractRead } from "wagmi";
import contracts from "../lib/contracts";

import Image from "next/image";
interface UnlockedDayProps {
  day: number;
  user: any;
  lock: string;
  network: number;
  justUnlocked?: boolean;
}

interface ModalProps {
  user: any;
  day: number;
  setShowModal: (show: boolean) => void;
  network: number;
  lock: string;
  tokenId: string;
}

interface Content {
  title?: string;
  description?: string;
  image?: string;
  youtube?: string;
  link?: string;
}

const Modal = ({ network, lock, tokenId, day, setShowModal }: ModalProps) => {
  const [content, setContent] = useState<Content | null>(null);
  const tweetIntent = new URL("https://twitter.com/intent/tweet");
  tweetIntent.searchParams.set(
    "text",
    `🎁 I have just unlocked Day ${day} of the @UnlockProtocol advent calendar!`
  );
  tweetIntent.searchParams.set("url", "https://advent.unlock-protocol.com");

  
  const openSeaLink = network === 5423 ? `https://opensea.io/assets/base/${lock}/${tokenId}` : `https://testnets.opensea.io/assets/goerli/${lock}/${tokenId}`

  useEffect(() => {
    setContent(days[day - 1]);
  }, [day]);

  const {data: hasWon} = useContractRead({
    address: contracts.hook.address as `0x${string}`,
    abi: contracts.hook.ABI,
    functionName: "haswOnByDay",
    args: [day, tokenId],
  })

  if (!content) {
    return <></>;
  }

  return (
    <>
      <div className="backdrop-blur-sm justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
        <div className="relative w-auto mx-auto max-w-3xl  bg-[url('/images/modal-background.png')] rounded-2xl border-8">
          <div className="rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none p-8 ">
            
            {/*body*/}
            <div className="relative flex-auto text-white">
              <div className="rounded-2xl overflow-hidden">
              {content.image && (
                <div className="aspect-w-16 aspect-h-9">
                  <Image width="1080" height="768" alt="money" src={content.image} />
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
                {!!hasWon && (
                  <p className="my-4 text-lg leading-relaxed bold">
                    🥳 Congratulations! You are a prize winner today!
                  </p>
                )}
                <ReactMarkdown className="markdown" skipHtml={false}>
                  {content.description!}
                </ReactMarkdown>
               
              </div>
            </div>
            <div className="container min-w-full sm:flex-row flex items-center justify-center rounded-b flex-col gap-4">
              {content.link && (
                <Link
                className="border whitespace-nowrap bg-white text-black font-bold py-2 px-4 mt-3 rounded  w-full text-center"
                  href={content.link!}
                  target="_blank"
                >
                  <SlMagnifier className="inline-block mr-2" />
                  Learn more
                </Link>
              )}
              <Link
                target="_blank"
                className="border whitespace-nowrap bg-white text-black font-bold py-2 px-4 mt-3 rounded  w-full text-center"
                href={tweetIntent.toString()}
              >
                <BsTwitter className="inline-block mr-2" />
                Tweet this
              </Link>

              <Link
                target="_blank"
                className="border whitespace-nowrap bg-white text-black font-bold py-2 px-4 mt-3 rounded  w-full text-center"
                href={openSeaLink}
              >
                <SiOpensea className="inline-block mr-2" />
                Check your NFT
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

const UnlockedDay = ({ lock, network, user, day, justUnlocked }: UnlockedDayProps) => {
  const [showModal, setShowModal] = useState(justUnlocked);

  useEffect(() => {
    if(justUnlocked) {
      snow.start();
    }
  }, [justUnlocked])


  const {data: tokenId} = useContractRead({
    address: lock as `0x${string}`,
    abi: contracts.lock.ABI,
    functionName: "tokenOfOwnerByIndex",
    args: [user, 0],
  })

  return (
    <>
      <BaseDay outterClasses={`border-[#75797E] text-white cursor-pointer`} day={day} hideDay={true} onClick={() => {
        setShowModal(true)}
      }>
        <Image
          src={`/images/nft/${day}.png`}
          alt={`NFT image for Day ${day}`}
          width={500}
          height={500}
          className="rounded-full"
        ></Image>
      </BaseDay>
      {showModal ? (
        <Modal lock={lock} network={network} tokenId={tokenId as string} user={user} day={day} setShowModal={(showModal) => {
          snow.stop()
          setShowModal(showModal)
        }} />
      ) : null}
    </>
  );
};

export default UnlockedDay;
