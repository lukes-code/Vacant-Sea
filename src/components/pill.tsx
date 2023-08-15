type Props = {
  children: React.ReactNode;
};

const Pill = (props: Props) => {
  const { children } = props;
  return (
    <button className="bg-green-500 text-black rounded px-2 text-sm w-fit hover:cursor-default mr-2 mb-1">
      {children}
    </button>
  );
};

export default Pill;
