import React, { useState } from "react";
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

import { CiFileOn } from "react-icons/ci";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
type NavbarProps = {};

type MarkdownFileType = {
  name: string;
  date: string;
};

const files = [
  {
    name: "untitled-document.md",
    date: "01 April 2022",
  },
  { name: "welcome.md", date: "01 April 2022" },
];

const MarkdownFile: React.FC<MarkdownFileType> = ({ name, date }) => {
  return (
    <NavigationMenu.Item className=" w-full font-roboto mb-6">
      <NavigationMenu.Trigger
        title={name}
        className="grid grid-rows-2 grid-cols-[16px,_auto] gap-x-4 items-center"
      >
        <CiFileOn className="row-span-2" />
        <p className="text-start text-bodyM text-500 mb-1">{date}</p>
        <p className="text-headingM">{name}</p>
      </NavigationMenu.Trigger>
    </NavigationMenu.Item>
  );
};

type toggleSwitchType = {
  e: HTMLButtonElement;
};

const Navbar: React.FC<NavbarProps> = () => {
  const windowWidth = useWindowWith();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const key = e.key;
    if (key === "Enter") setIsDarkMode((prev) => !prev);
  };

  return (
    <NavigationMenu.Root
      orientation="vertical"
      className="bg-800 text-100 fixed w-full grid grid-cols-[250px,_auto] grid-rows-[56px,1fr]"
    >
      <NavigationMenu.List className="w-[250px] h-[100vh] bg-900 px-6 py-7 flex flex-col">
        <Image src={logo} alt="web logo" />
        <h3 className="text-headingS uppercase text-500 py-7 font-roboto">
          My Documents
        </h3>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            title="new document"
            className="bg-orange hover:bg-orangeHover w-full py-3 mb-6
       text-100 rounded text-headingM font-roboto flex justify-center items-center"
          >
            + New Document
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
        {files.map((item) => (
          <MarkdownFile key={item.name} name={item.name} date={item.date} />
        ))}
        <NavigationMenu.Item className="mt-auto">
          <NavigationMenu.Trigger
            title="theme switch"
            onKeyDown={(e) => toggleSwitch(e)}
          >
            <ThemeSwitch
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.List className="flex items-center pr-2 sm:pr-4 justify-between h-[56px] sm:h-[76px]">
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
