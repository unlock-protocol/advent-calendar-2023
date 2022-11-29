import { useAuth } from "../hooks/useAuth";
import FutureDay from "./FutureDay";
import NotConnectedDay from "./NotConnectedDay";
import UnlockableDay from "./UnlockableDay";

interface DayProps {
  day: number;
}

const Day = ({ day }: DayProps) => {
  const { isAuthenticated, user } = useAuth();

  // TODO: Change later!
  const now = new Date("2022-12-06");

  if (now.getFullYear() < 2022 || now.getMonth() < 11 || now.getDate() < day) {
    return <FutureDay day={day} />;
  }

  if (!user) {
    return <NotConnectedDay day={day} />;
  }

  return <UnlockableDay user={user} day={day} />;
};

export default Day;
