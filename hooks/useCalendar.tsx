import { useContractRead, useContractReads } from "wagmi";
import { useAuth } from "./useAuth";
import contracts from "../lib/contracts";

export const useCalendar = () => {

  const { wallet } = useAuth();
  
  const days = new Array(24).fill(0).map((d, i) => i + 1);
  
  const { data: start, isLoading: isLoadingStart } = useContractRead({
    address: contracts.hook.address as `0x${string}`,
    abi: contracts.hook.ABI,
    functionName: "start",
    chainId: contracts.network,
    args: [],
    cacheTime: 1_000_000_000
  })
  
  const { data: lockAddresses, isLoading: isLoadingLocks } = useContractReads({
    // @ts-expect-error
    contracts: days.map((d) => {
      const dayAsDate = new Date((Number(start) + (d -1) * 24 * 60 * 60) * 1000);
      const isFutureDay = dayAsDate > new Date();
      if (isFutureDay) {
        return
      }
      return {
        address: contracts.hook.address as `0x${string}`,
        abi: contracts.hook.ABI,
        functionName: "lockByDay",
        chainId: contracts.network,
        args: [d],
      }
    }).filter((d) => !!d),
    enabled: !!(start && !isLoadingStart),
    cacheTime: 3_600_000
  })

  // Now load all the locks that are available!
  const { data: validKeys, isLoading: isLoadingValidKeys, refetch } = useContractReads({
    // @ts-expect-error
    contracts: lockAddresses?.map((lockAddresses) => ({
      address: lockAddresses?.result as `0x${string}`,
      abi: contracts.lock.ABI,
      functionName: "getHasValidKey",
      chainId: contracts.network,
      args: [wallet?.address],
    })) || [],
    enabled: !!(wallet?.address),
    cacheTime: 5_000
  })

  if (isLoadingStart || isLoadingLocks || isLoadingValidKeys) {
    return {isLoading: true, days: [], lockAddresses: [], validKeys: []}
  }

  return {start, refetch, isLoading: false, days, lockAddresses, validKeys}
}