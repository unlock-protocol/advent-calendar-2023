import BaseDay from "./BaseDay";

interface FutureDayProps {
  day: number;
}

const FutureDay = ({ day }: FutureDayProps) => {
  console.log('FUture', {day})
  return (
    <BaseDay
      outterClasses="bg-[#494E53] border-none"
      day={day}
    />
  );
};

export default FutureDay;
