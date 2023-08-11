import Toggle from "./toggle";

const Nav: React.FC = () => {
  return (
    <div className={wrapperStyle}>
      <h6>Vacant Sea</h6>
      <Toggle />
    </div>
  );
};

const wrapperStyle =
  "flex p-4 justify-between dark:text-white text-black h-[5vh]";

export default Nav;
