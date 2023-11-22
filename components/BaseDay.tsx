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
  outterClasses = `${outterClasses} border-solid border rounded-full h-[72px] w-[72px] relative`;
  innerClasses = `${innerClasses} w-full absolute left-0 top-0 bottom-0 flex items-center justify-center text-center`;
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
