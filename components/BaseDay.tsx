interface BaseDayProps {
  day: number;
  children?: JSX.Element;
  onClick?: () => void;
  outterClasses?: string;
  innerClasses?: string;
}

const BaseDay = ({
  day,
  onClick,
  children,
  outterClasses,
  innerClasses,
}: BaseDayProps) => {
  if (!outterClasses) {
    outterClasses = "bg-red border-yellow text-yellow";
  }
  outterClasses = `${outterClasses} border-solid border-2 group day p-4 rounded-lg shadow-lg h-36 relative`;
  innerClasses = `${innerClasses} w-full absolute left-0 top-0 bottom-0 flex items-center justify-center  text-red-700 visible  text-center flex-col`;
  if (onClick) {
    outterClasses = `${outterClasses} cursor-pointer`;
  }
  if (children) {
    innerClasses = `${innerClasses} group-hover:invisible`;
  }
  return (
    <div onClick={onClick} className={outterClasses}>
      <div className={innerClasses}>
        <span className="text-6xl mb-1">{day}</span>
        <span className="text-3xl">Dec</span>
      </div>

      {children}
    </div>
  );
};

export default BaseDay;
