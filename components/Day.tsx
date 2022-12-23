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
  now?: Date;
  isLoading: boolean;
}

const Day = ({ day, now, isLoading }: DayProps) => {
  const { isAuthenticated, user } = useAuth();
  const { query, replace } = useRouter();

  if (isLoading || !now) {
    return <LoadingDay day={day} />;
  }

  const isFutureDay =
    now.getUTCFullYear() < 2022 ||
    now.getUTCMonth() < 11 ||
    now.getUTCDate() < day;

  if (
    query.admin?.toString() === "true" &&
    day === parseInt(query.day?.toString() || "")
  ) {
    return <UnlockedDay day={day} user={user} />;
  }

  if (day === 24) {
    return <LastDay isFutureDay={isFutureDay} day={24} user={user} />;
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

  // We should show this only if the user has unlocked the previous day!
  return <UnlockableDay user={user} day={day} />;
};

export default Day;
