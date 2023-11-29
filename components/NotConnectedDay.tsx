import { usePrivy } from "@privy-io/react-auth";
import { useAuth } from "../hooks/useAuth";
import BaseDay from "./BaseDay";

interface NotConnectedDayProps {
  day: number;
}

const NotConnectedDay = ({ day }: NotConnectedDayProps) => {
  const {login} = usePrivy();

  return (
    <BaseDay day={day} outterClasses="bg-white border-none cursor-pointer" onClick={() => login()} />
  );
};

export default NotConnectedDay;
