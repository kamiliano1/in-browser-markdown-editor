import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuSave } from "react-icons/lu";
import logo from "../../../public/logo.svg";
import useWindowWith from "../../hooks/useWindowWidth";
import InputText from "../InputText/InputText";
import { CiFileOn } from "react-icons/ci";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import HamburgerIcon from "./HamburgerIcon";
import { MarkdownDataType, editorState } from "@/atoms/markdownAtom";
import { useRecoilState } from "recoil";
import { nanoid } from "nanoid";
type MarkdownFileType = {
  data: MarkdownDataType;
};

const MarkdownFile: React.FC<MarkdownFileType> = ({ data }) => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const { name, createdAt, id } = data;
  const activateMarkdown = () => {
    setMarkdownEditorState((prev) => ({ ...prev, activeMarkdownId: id }));
  };
  return (
    <NavigationMenu.Item
      className=" w-full font-roboto mb-6"
      onClick={activateMarkdown}
    >
      <NavigationMenu.Trigger
        title={name}
        className="grid grid-rows-2 grid-cols-[16px,_auto] gap-x-4 items-center"
      >
        <CiFileOn className="row-span-2" />
        <p className="text-start text-bodyM text-500 mb-1">{createdAt}</p>
        <p className="text-headingM hover:text-orange">{name}</p>
      </NavigationMenu.Trigger>
    </NavigationMenu.Item>
  );
};
type NavbarProps = {};
const Navbar: React.FC<NavbarProps> = () => {
  const windowWidth = useWindowWith();

  const addLeadingZeros = (n: number) => {
    return n <= 9 ? "0" + n : n;
  };

  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const addNewMarkdown = () => {
    const todayDate = `${addLeadingZeros(
      new Date().getDate()
    )}-${addLeadingZeros(new Date().getMonth())}-${new Date().getFullYear()}`;

    setMarkdownEditorState((prev) => ({
      ...prev,
      data: [
        ...prev.data,
        { name: "", content: "", createdAt: todayDate, id: nanoid() },
      ],
    }));
  };
  return (
    <NavigationMenu.Root
      orientation="vertical"
      className={`text-100 fixed w-full grid
        grid-cols-[250px,_100vw]
        grid-rows-[56px,1fr] sm:grid-rows-[72px,1fr] z-[5] transition duration-500 ${
          !markdownEditorState.isSidebarOpen && "-translate-x-[250px]"
        }`}
    >
      <NavigationMenu.List className="w-[250px] h-[100vh] bg-900 px-6 py-7 flex flex-col">
        <Image src={logo} alt="web logo" className="lg:hidden" />
        <h3 className="text-headingS uppercase text-500 py-7 lg:pt-0 font-roboto">
          My Documents
        </h3>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            onClick={addNewMarkdown}
            title="new document"
            className="bg-orange hover:bg-orangeHover w-full py-2.5 mb-6
             text-100 rounded text-headingM font-roboto flex justify-center items-center"
          >
            + New Document
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
        {markdownEditorState.data?.map((item) => (
          <MarkdownFile key={item.id} data={item} />
        ))}
        <NavigationMenu.Item className="mt-auto">
          <ThemeSwitch />
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.List className="flex items-center pr-2 sm:pr-4 justify-between h-[56px] sm:h-[72px] bg-800">
        <NavigationMenu.Item className="flex items-center justify-center bg-700 h-[56px] sm:h-[72px] aspect-square mr-6">
          <NavigationMenu.Trigger title="toggle sidebar">
            <HamburgerIcon />
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
          <NavigationMenu.Trigger
            title="delete markdown"
            onClick={() =>
              setMarkdownEditorState((prev) => ({
                ...prev,
                isDeleteModalOpen: true,
              }))
            }
          >
            <FaRegTrashAlt className="text-500 text-5 ml-4 hover:text-orange" />
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
