import BaseDay from "./BaseDay";

interface FutureDayProps {
  day: number;
}

const FutureDay = ({ day }: FutureDayProps) => {
  return (
    <BaseDay day={day}>
      <span className="cursor-auto w-full absolute left-0 top-0 bottom-0 flex items-center justify-center text-5xl invisible group-hover:visible">
        ❓
      </span>
    </BaseDay>
  );
};

export default FutureDay;
