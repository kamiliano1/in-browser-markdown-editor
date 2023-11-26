import * as Switch from "@radix-ui/react-switch";
import { useState } from "react";
import { BiSun } from "react-icons/bi";
import { IoMoonOutline } from "react-icons/io5";
type ThemeSwitchProps = {};

const ThemeSwitch: React.FC<ThemeSwitchProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div
      className={`flex items-center justify-end cursor-pointer h-[24px] w-min ml-auto bg-300
          `}
    >
      <label htmlFor="theme-switcher">
        <IoMoonOutline
          className={`text-[1rem] ${!isDarkMode ? "text-100" : "text-600"}`}
        />
      </label>
      <Switch.Root
        checked={isDarkMode}
        title="theme-switcher"
        className="bg-600 w-[48px] mx-2.5 h-[24px] rounded-full relative data-[state=checked]:bg-black outline-none cursor-pointer"
        id="theme-switcher"
        onCheckedChange={(state) => setIsDarkMode(state)}
      >
        <Switch.Thumb className="mx-1 block w-3 h-3 bg-100 rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[26px]" />
      </Switch.Root>
      <label htmlFor="theme-switcher">
        <BiSun
          className={`text-[1.125rem] ${isDarkMode ? "text-100" : "text-600"}`}
        />
      </label>
    </div>
  );
};
export default ThemeSwitch;
