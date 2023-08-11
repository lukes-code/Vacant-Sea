type Props = {
  primary: string | number;
  secondary: string;
};

const StatCard = (props: Props) => {
  const { primary, secondary } = props;
  return (
    <div className={wrapperStyle}>
      <h2 className={primaryStyle}>{primary}</h2>
      <p className={secondaryStyle}>{secondary}</p>
    </div>
  );
};

const primaryStyle = "text-lightBlue text-4xl p-2";

const secondaryStyle = "px-1";

const wrapperStyle =
  "p-2 rounded bg-gray-200 dark:bg-slate-800 h-[95px] w-[105px] justify-center text-center";

export default StatCard;
