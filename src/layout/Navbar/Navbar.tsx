import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { IoMenuOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import { LuSave } from "react-icons/lu";
import useWindowWith from "../../hooks/useWindowWidth";
import logo from "../../../public/logo.svg";
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const windowWidth = useWindowWith();
  return (
    <NavigationMenu.Root className=" bg-800 text-100">
      <NavigationMenu.List className="flex items-center pr-2 sm:pr-4 justify-between">
        <NavigationMenu.Item className="flex items-center justify-center bg-700 h-[56px] sm:h-[76px] aspect-square mr-6">
          <NavigationMenu.Trigger title="toggle sidebar">
            <IoMenuOutline className="text-previewH1 sm:text-[3rem]" />
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
        <Image src={logo} alt="web logo" className="hidden lg:block" />
        <span className="hidden lg:block ml-7 mr-6 h-10 w-[1px] bg-600"></span>
        <NavigationMenu.Item className="mr-auto">
          <NavigationMenu.Trigger title="change markdown name">
            <InputText />
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="mr-6">
          <NavigationMenu.Trigger title="delete markdown">
            <FaRegTrashAlt className="text-500 text-5 ml-4 hover:bg-orange" />
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="">
          <NavigationMenu.Trigger
            title="save changes"
            className="bg-orange hover:bg-orangeHover 
       text-100 rounded text-headingM font-roboto h-10 w-10 sm:w-auto sm:px-4 flex justify-center items-center"
          >
            <LuSave className="text-[1.3rem] sm:mr-2" />
            {windowWidth > 768 && "Save changes"}
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
export default Navbar;
