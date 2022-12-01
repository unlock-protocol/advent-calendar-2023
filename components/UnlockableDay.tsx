import { useLock } from "../hooks/useLock";
import UnlockedDay from "./UnlockedDay";
import LoadingDay from "./LoadingDay";
import BaseDay from "./BaseDay";
import FutureDay from "./FutureDay";
import { useAuth } from "../hooks/useAuth";
import days from "../lib/days";

interface UnlockableDayProps {
  user: string;
  day: number;
}

const UnlockableDay = ({ user, day }: UnlockableDayProps) => {
  const {
    hasMembership: previousDayMembership,
    isLoading: previousDayLoading,
  } = useLock(user, day - 1);
  const { purchase } = useAuth();

  const { hasMembership, isLoading } = useLock(user, day);

  if (isLoading || previousDayLoading) {
    return <LoadingDay day={day} />;
  }

  if (!previousDayMembership) {
    return <FutureDay day={day} />;
  }

  if (hasMembership) {
    return <UnlockedDay day={day} />;
  }

  const checkout = () => {
    purchase(
      {
        locks: {
          [days[day - 1].lock]: {
            network: 137,
          },
        },
        pessimistic: true,
      },
      { day: day.toString() }
    );
  };

  return (
    <BaseDay onClick={checkout} day={day}>
      <span className="cursor-pointer w-full absolute left-0 top-0 bottom-0 flex items-center justify-center text-7xl invisible group-hover:visible">
        🎁
      </span>
    </BaseDay>
  );
};

export default UnlockableDay;