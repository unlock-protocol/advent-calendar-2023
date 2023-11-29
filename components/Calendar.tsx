import { useContractRead, useContractReads } from "wagmi";
import Day from "./Day";
import contracts from "../lib/contracts";

export const Calendar = () => {
  const days = new Array(24).fill(0).map((d, i) => i + 1);
  const {data: start, isLoading} =useContractRead({
    address: contracts.hook.address as `0x${string}`,
    abi: contracts.hook.ABI,
    functionName: "start",
    chainId: contracts.hook.network,
    args: [],
  })
  
  const {data: lockAddresses, isLoading: isLoadingLocks} = useContractReads({
    // @ts-expect-error
    contracts: days.map((d) => ({
      address: contracts.hook.address as `0x${string}`,
      abi: contracts.hook.ABI,
      functionName: "lockByDay",
      chainId: contracts.hook.network,
      args: [d-1],
    })),
  })

  return <div className="place-content-center grid grid-cols-1 sm:grid-cols-[repeat(7,72px)] gap-4 my-8">
  <div className="sm:col-span-4" />
  {days.map((day, index) => {
    if (day > -1 && day < 25) {        
      if (!lockAddresses || !lockAddresses![day]) {
        return
      }
      return (
        <div className="flex flex-col items-center	" key={index}>

          <Day
            lock={lockAddresses[day].result as `0x${string}`}
            previousDayLock={lockAddresses![day -1].result as `0x${string}`}
            isLoading={isLoading || isLoadingLocks}
            day={day}
            start={start ? Number(start) : undefined}
            network={contracts.hook.network}
          />
        </div>
      );
    }
  })}
  </div>
}