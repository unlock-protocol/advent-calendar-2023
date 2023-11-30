import FutureDay from "./FutureDay";
import LoadingDay from "./LoadingDay";
import NotConnectedDay from "./NotConnectedDay";
import UnlockableDay from "./UnlockableDay";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { usePrivy } from "@privy-io/react-auth";

interface DayProps {
  day: number;
  start?: number;
  isLoading: boolean;
  lock?: string | null;
  previousDayLock?: string | null;
  network: number;
}

const Day = ({ day, start, isLoading, lock, previousDayLock, network }: DayProps) => {
  const {authenticated} = usePrivy();
  const {wallet: activeWallet} = usePrivyWagmi();

  if (isLoading || !start || !lock ) {
    return <LoadingDay day={day} />;
  }
  const dayAsDate = new Date((Number(start) + day * 24 * 60 * 60) * 1000);
  const isFutureDay = dayAsDate > new Date();

  if (isFutureDay) {
    return <FutureDay day={day} />;
  }

  if (!activeWallet || !authenticated) {
    if (day === 1) {
      return <NotConnectedDay day={day} />;
    }
    return <FutureDay day={day} />;
  }

  return <UnlockableDay user={activeWallet.address} day={day} network={network} lock={lock} previousDayLock={previousDayLock} />;
};

export default Day;
