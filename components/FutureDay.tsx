import BaseDay from "./BaseDay";

interface FutureDayProps {
  day: number;
}

const FutureDay = ({ day }: FutureDayProps) => {
  return (
    <BaseDay
      outterClasses="bg-[#494E53] border-none"
      day={day}
    />
  );
};

export default FutureDay;
