import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ButtonProps<T extends ElementType> = {
  renderAs?: T;
  children: ReactNode;
  cssClassName?: string;
} & ComponentPropsWithoutRef<T>;

const Button = <T extends ElementType = "button">({
  renderAs,
  children,
  cssClassName,
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <button
      {...rest}
      className={` ${cssClassName} bg-orange hover:bg-orangeHover 
       text-100 rounded text-headingM font-roboto`}
    >
      {children}
    </button>
  );
};
export default Button;
