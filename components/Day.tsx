import { useAuth } from "../hooks/useAuth";
import { useLock } from "../hooks/useLock";
import FutureDay from "./FutureDay";
import LoadingDay from "./LoadingDay";
import NotConnectedDay from "./NotConnectedDay";
import UnlockableDay from "./UnlockableDay";

interface DayProps {
  day: number;
}

const Day = ({ day }: DayProps) => {
  const { isAuthenticated, user } = useAuth();

  const now = new Date();

  if (now.getFullYear() < 2022 || now.getMonth() < 11 || now.getDate() < day) {
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
