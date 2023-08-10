type Props = {
  children: React.ReactNode;
};

const Pill = (props: Props) => {
  const { children } = props;
  return <button className={pillStyle}>{children}</button>;
};

const pillStyle =
  "bg-green-500 text-black rounded px-2 text-sm w-fit hover:cursor-default";

export default Pill;
