import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { useLock } from "../hooks/useLock";
import FutureDay from "./FutureDay";
import LastDay from "./LastDay";
import LoadingDay from "./LoadingDay";
import NotConnectedDay from "./NotConnectedDay";
import UnlockableDay from "./UnlockableDay";
import UnlockedDay from "./UnlockedDay";

interface DayProps {
  day: number;
  start?: number;
  isLoading: boolean;
  lock?: string | null;
  previousDayLock?: string | null;
  network: number;
}

const Day = ({ day, start, isLoading, lock, previousDayLock, network }: DayProps) => {
  const { user } = useAuth();
  const { query } = useRouter();

  if (isLoading || !start || !lock ) {
    return <LoadingDay day={day} />;
  }
  const dayAsDate = new Date((Number(start) + day * 24 * 60 * 60) * 1000);
  const isFutureDay = dayAsDate > new Date();

  if (
    query.admin?.toString() === "true" &&
    day === parseInt(query.day?.toString() || "")
  ) {
    return <UnlockedDay day={day} user={user} />;
  }

  if (isFutureDay) {
    return <FutureDay day={day} />;
  }

  if (!user) {
    if (day === 1) {
      return <NotConnectedDay day={day} />;
    }
    return <FutureDay day={day} />;
  }

  return <UnlockableDay user={user} day={day} network={network} lock={lock} previousDayLock={previousDayLock} />;
};

export default Day;
