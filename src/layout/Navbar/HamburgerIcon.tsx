import React, { Dispatch, SetStateAction } from "react";

type HamburgerIconProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ open, setOpen }) => {
  return (
    <div
      className={`w-[23.5px] sm:w-[30px] sm:h-[22.5px] h-[18px] flex flex-col justify-between`}
      onClick={() => setOpen((prev) => !prev)}
    >
      <span
        className={`w-full h-[1.56px] bg-300 origin-top-left rounded-xl ${
          open ? "animate-closeIconAfter rotate-45" : "animate-openIconAfter"
        }`}
      ></span>
      <span
        className={`w-full h-[1.56px] bg-300 rounded-xl ${
          open ? "animate-closeIcon opacity-0" : "animate-openIcon"
        }`}
      ></span>
      <span
        className={`w-full h-[1.56px] bg-300 origin-bottom-left rounded-xl ${
          open
            ? "animate-closeIconBefore rotate-[-45deg]"
            : "animate-openIconBefore"
        }`}
      ></span>
    </div>
  );
};
export default HamburgerIcon;
