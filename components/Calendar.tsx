import { useContractRead, useContractReads } from "wagmi";
import Day from "./Day";
import contracts from "../lib/contracts";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export const Calendar = () => {
  const days = new Array(24).fill(0).map((d, i) => i + 1);
  const {data: start, isLoading} =useContractRead({
    address: contracts.hook.address as `0x${string}`,
    abi: contracts.hook.ABI,
    functionName: "start",
    chainId: contracts.network,
    args: [],
  })
  const {linkEmail, authenticated, user} = usePrivy();

  useEffect(() => {
    if (authenticated && !user?.email) {
      linkEmail();
    }
  }, [authenticated])
  
  const {data: lockAddresses, isLoading: isLoadingLocks} = useContractReads({
    // @ts-expect-error
    contracts: days.map((d) => ({
      address: contracts.hook.address as `0x${string}`,
      abi: contracts.hook.ABI,
      functionName: "lockByDay",
      chainId: contracts.network,
      args: [d],
    })),
  })

  return <div className="place-content-center grid grid-cols-1 sm:grid-cols-[repeat(7,72px)] gap-4 my-8">
  <div className="sm:col-span-4" />
  {days.map((day, index) => {
      if (!lockAddresses || !lockAddresses![day-1]) {
        return
      }
      return (
        <div className="flex flex-col items-center	" key={index}>

          <Day
            lock={lockAddresses[day -1].result as `0x${string}`}
            previousDayLock={day > 1 ? lockAddresses![day-2].result as `0x${string}` : undefined}
            isLoading={isLoading || isLoadingLocks}
            day={day}
            start={start ? Number(start) : undefined}
            network={contracts.network}
          />
        </div>
      );
  })}
  </div>
}