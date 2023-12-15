import { useContractRead, useContractReads } from "wagmi";
import Day from "./Day";
import contracts from "../lib/contracts";
import { useAuth } from "../hooks/useAuth";

export const Calendar = () => {
  const { wallet } = useAuth();
  
  const days = new Array(24).fill(0).map((d, i) => i + 1);
  
  const {data: start, isLoading: isLoadingStart} = useContractRead({
    address: contracts.hook.address as `0x${string}`,
    abi: contracts.hook.ABI,
    functionName: "start",
    chainId: contracts.network,
    args: [],
  })
  
  const { data: lockAddresses, isLoading: isLoadingLocks } = useContractReads({
    // @ts-expect-error
    contracts: days.map((d) => ({
      address: contracts.hook.address as `0x${string}`,
      abi: contracts.hook.ABI,
      functionName: "lockByDay",
      chainId: contracts.network,
      args: [d],
    })),
  })

  // Now load all the locks that are available!
  const {data: validKeys, isLoading: isLoadingValidKeys, refetch} = useContractReads({
    // @ts-expect-error
    contracts: lockAddresses?.map((lockAddresses) => ({
      address: lockAddresses?.result as `0x${string}`,
      abi: contracts.lock.ABI,
      functionName: "getHasValidKey",
      chainId: contracts.network,
      args: [wallet?.address],
    })) || [],
    enabled: !!(wallet?.address)
  })

  return <div className="place-content-center grid grid-cols-[repeat(7,45px)] sm:grid-cols-[repeat(7,72px)] gap-2 sm:gap-4 my-8">
  <div className="col-span-4" />
  {days.map((day, index) => {
      if (!lockAddresses || !lockAddresses![day-1]) {
        return
      }
      const hasMembership = validKeys ? validKeys[index]?.result || false : false
      const hasPreviousDayMembership = validKeys ? index == 0 || validKeys[index-1]?.result || false : false

      return (
        <div className="flex flex-col items-center" key={index}>
          <Day
            lock={lockAddresses[day -1].result as `0x${string}`}
            isLoading={isLoadingStart || isLoadingLocks || isLoadingValidKeys}
            day={day}
            start={start ? Number(start) : undefined}
            network={contracts.network}
            hasMembership={!!hasMembership}
            hasPreviousDayMembership={!!hasPreviousDayMembership}
            refetch={refetch}
          />
        </div>
      );
  })}
  </div>
}