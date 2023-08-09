import React from "react";
import * as Switch from "@radix-ui/react-switch";
import { useThemeContext } from "@/context/theme";

const Toggle = () => {
  const { darkMode, setDarkMode } = useThemeContext();
  return (
    <div className={wrapperStyle}>
      <label>&#127774;</label>
      <Switch.Root
        className={rootStyle}
        onCheckedChange={() => setDarkMode(!darkMode)}
        defaultChecked={darkMode}
      >
        <Switch.Thumb className={thumbStyle} />
      </Switch.Root>
      <label>&#127771;</label>
    </div>
  );
};

const wrapperStyle = "flex items-center space-x-1";

const rootStyle =
  "w-[35px] h-[20px] bg-black rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-gray-100 data-[state=checked]:bg-gray-300 outline-none cursor-default";

const thumbStyle =
  "block w-[16px] h-[16px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[17px]";

export default Toggle;
