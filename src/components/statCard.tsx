type Props = {
  primary: string | number;
  secondary: string;
};

const StatCard = (props: Props) => {
  const { primary, secondary } = props;
  return (
    <div className="p-2 rounded bg-gray-200 dark:bg-slate-800 h-[95px] min-w-[105px] justify-center text-center">
      <h2 className="text-lightBlue text-4xl p-2">{primary}</h2>
      <p className="px-1">{secondary}</p>
    </div>
  );
};

export default StatCard;
