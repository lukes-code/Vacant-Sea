import { CursorArrowIcon } from "@radix-ui/react-icons";
import Toggle from "./toggle";
import Link from "next/link";

const Nav: React.FC = () => {
  return (
    <div className={wrapperStyle}>
      <Link href="/" className={logoStyle}>
        <h3 className={titleStyle}>Vacant Sea</h3>
        <CursorArrowIcon />
      </Link>
      <Toggle />
    </div>
  );
};

const logoStyle = "flex items-center space-x-1";

const titleStyle = "text-lg";

const wrapperStyle =
  "flex p-5 justify-between dark:text-white text-black h-[5vh]";

export default Nav;
