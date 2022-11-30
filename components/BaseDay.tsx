interface BaseDayProps {
  day: number;
  children: JSX.Element;
  onClick?: () => void;
}

const BaseDay = ({ day, onClick, children }: BaseDayProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-red border-solid border-2 border-yellow  text-yellow group cursor-pointer day p-4 rounded-lg shadow-lg h-36 relative"
    >
      <div className="w-full absolute left-0 top-0 bottom-0 flex items-center justify-center  text-red-700 visible group-hover:invisible text-center flex-col">
        <span className="text-6xl mb-1">{day}</span>
        <span className="text-3xl">Dec</span>
      </div>

      {children}
    </div>
  );
};

export default BaseDay;
