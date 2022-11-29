interface BaseDayProps {
  day: number;
  children: JSX.Element;
  onClick?: () => void;
}

const BaseDay = ({ day, onClick, children }: BaseDayProps) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer day p-4 rounded-lg shadow-lg h-48 bg-red-200 relative"
    >
      <span className="w-full absolute left-0 top-0 bottom-0 flex items-center justify-center text-9xl text-red-700 visible group-hover:invisible">
        {day}
      </span>
      {children}
    </div>
  );
};

export default BaseDay;
