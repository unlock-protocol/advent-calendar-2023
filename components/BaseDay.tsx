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
  outterClasses = "",
  innerClasses = "",
}: BaseDayProps) => {
  if (!outterClasses) {
    outterClasses = "";
  }
  outterClasses = `${outterClasses} border-solid border rounded-full sm:h-[72px] sm:w-[72px] h-[45px] w-[45px] relative`;
  innerClasses = `${innerClasses} text-lg sm:text-2xl w-full absolute left-0 top-0 bottom-0 font flex items-center justify-center text-center font-bold	`;
  if (onClick) {
    outterClasses = `${outterClasses} cursor-pointer`;
  }
  if (children) {
    innerClasses = `${innerClasses} group-hover:invisible`;
  }
  return (
    <div onClick={onClick} className={outterClasses}>
      <div className={innerClasses}>
        {day}
      </div>

      {children}
    </div>
  );
};

export default BaseDay;
