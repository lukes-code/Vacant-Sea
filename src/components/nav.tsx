import { CursorArrowIcon } from "@radix-ui/react-icons";
import Toggle from "./toggle";
import Link from "next/link";

const Nav: React.FC = () => {
  return (
    <div className="flex p-5 justify-between dark:text-white text-black h-[5vh]">
      <Link href="/" className="flex items-center space-x-1">
        <h3 className="text-lg">Vacant Sea</h3>
        <CursorArrowIcon />
      </Link>
      <Toggle />
    </div>
  );
};

export default Nav;
