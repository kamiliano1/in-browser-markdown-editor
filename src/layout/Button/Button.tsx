import React, { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  cssClassName?: string;
} & ComponentProps<"button">;

const Button = ({
  children,
  cssClassName,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <button
      {...rest}
      className={` ${cssClassName} bg-[#b75236] hover:bg-orangeHover 
       text-100 rounded text-headingM font-roboto`}
    >
      {children}
    </button>
  );
};
export default Button;
