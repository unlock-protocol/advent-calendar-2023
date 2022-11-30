import BaseDay from "./BaseDay";

interface FutureDayProps {
  day: number;
}

const FutureDay = ({ day }: FutureDayProps) => {
  return (
    <BaseDay
      outterClasses="bg-darkred border-darkyellow text-darkyellow"
      day={day}
    />
  );
};

export default FutureDay;
