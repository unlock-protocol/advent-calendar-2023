import { useContractRead, useContractReads } from "wagmi";
import Day from "./Day";
import contracts from "../lib/contracts";
import { useAuth } from "../hooks/useAuth";
import { useCalendar } from "../hooks/useCalendar";
import FutureDay from "./FutureDay";

export const Calendar = () => {

  const {days, lockAddresses, validKeys, isLoading, start, refetch}  = useCalendar()
  return <div className="place-content-center grid grid-cols-[repeat(7,45px)] sm:grid-cols-[repeat(7,72px)] gap-2 sm:gap-4">
  <div className="col-span-4" />
  {days.map((day, index) => {
      if (!lockAddresses || !lockAddresses![day-1]) {
        return <FutureDay  key={index} day={day} />
      }
      const hasMembership = validKeys ? validKeys[index]?.result || false : false
      const hasPreviousDayMembership = validKeys ? index == 0 || validKeys[index-1]?.result || false : false
      return (
        <div className="flex flex-col items-center" key={index}>
          <Day
            lock={lockAddresses[day-1].result as `0x${string}`}
            isLoading={isLoading}
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