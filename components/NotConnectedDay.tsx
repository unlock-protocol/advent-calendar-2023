import { useAuth } from "../hooks/useAuth";
import BaseDay from "./BaseDay";

interface NotConnectedDayProps {
  day: number;
}

const NotConnectedDay = ({ day }: NotConnectedDayProps) => {
  const { login } = useAuth();

  return (
    <BaseDay day={day}>
      <button
        className="cursor-pointer  w-full absolute left-0 top-0 bottom-0 flex items-center justify-center text-3xl invisible group-hover:visible text-white font-bold py-2 px-4 rounded bg-red-500"
        onClick={() => login()}
      >
        Connect!
      </button>
    </BaseDay>
  );
};

export default NotConnectedDay;
