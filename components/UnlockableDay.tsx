import { useLock } from "../hooks/useLock";
import UnlockedDay from "./UnlockedDay";
import LoadingDay from "./LoadingDay";
import BaseDay from "./BaseDay";
import FutureDay from "./FutureDay";
import { useAuth } from "../hooks/useAuth";
import contracts from "../lib/contracts";
import { useContractRead, useContractReads } from "wagmi";

interface UnlockableDayProps {
  user: string;
  day: number;
  lock: string;
  previousDayLock?: string | null;
  network: number
}

const UnlockableDay = ({ user, day, lock, previousDayLock, network }: UnlockableDayProps) => {
  const { purchase } = useAuth();

  const {
    data: memberships,
    isLoading: membershipsLoading,
    ...rest
  } = useContractReads({contracts: [{
    address: lock as `0x${string}`,
    // @ts-expect-error
    abi: contracts.lock.ABI,
    functionName: "getHasValidKey",
    chainId: contracts.hook.network,

    args: [user],
  }, {
    address: previousDayLock as `0x${string}`,
    // @ts-expect-error
    abi: contracts.lock.ABI,
    functionName: "getHasValidKey",
    chainId: contracts.hook.network,
    args: [user],
  }]});

  const isLoading = membershipsLoading
  const [hasMembership, previousDayMembership] = memberships || []

  if (isLoading) {
    return <LoadingDay day={day} />;
  }

  if (!previousDayMembership?.result && day > 1) {
    return <FutureDay day={day} />;
  }

  if (hasMembership?.result) {
    return <UnlockedDay user={user} day={day} />;
  }

  const checkout = () => {
    console.log(day)
      purchase(
        {
          locks: {
            [lock]: {
              network,
            },
          },
          pessimistic: true,
        },
        { day: day.toString() }
      );
  };

  return (
    <BaseDay outterClasses="bg-white border-none cursor-pointer" onClick={checkout} day={day} />
  );
};

export default UnlockableDay;
