import { useLock } from "../hooks/useLock";
import UnlockedDay from "./UnlockedDay";
import LoadingDay from "./LoadingDay";
import BaseDay from "./BaseDay";

interface UnlockableDayProps {
  user: string;
  day: number;
}

const UnlockableDay = ({ user, day }: UnlockableDayProps) => {
  const { hasMembership, loading } = useLock(user, day);

  if (loading) {
    return <LoadingDay day={day} />;
  }

  if (hasMembership) {
    return <UnlockedDay day={day} />;
  }

  return (
    <BaseDay day={day}>
      <span className="cursor-pointer w-full absolute left-0 top-0 bottom-0 flex items-center justify-center text-7xl invisible group-hover:visible">
        🎁
      </span>
    </BaseDay>
  );
};

export default UnlockableDay;
