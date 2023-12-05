import BaseDay from "./BaseDay";
import { useAuth } from "../hooks/useAuth";

interface NotConnectedDayProps {
  day: number;
}

const NotConnectedDay = ({ day }: NotConnectedDayProps) => {
  const {login} = useAuth();

  return (
    <BaseDay day={day} outterClasses="bg-white border-none cursor-pointer" onClick={() => login()} />
  );
};

export default NotConnectedDay;
