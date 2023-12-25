import { editorState } from "@/atoms/markdownAtom";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuSave } from "react-icons/lu";
import { useRecoilState } from "recoil";
import logo from "../../../public/logo.svg";
import useWindowWith from "../../hooks/useWindowWidth";
import InputText from "../InputText/InputText";
import HamburgerIcon from "./HamburgerIcon";

type NavbarProps = {};
const Navbar: React.FC<NavbarProps> = () => {
  const windowWidth = useWindowWith();
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);

  const saveChanges = () => {
    const savedMarkdownName = markdownEditorState.data.map((item) =>
      item.id === markdownEditorState.activeMarkdownId
        ? { ...item, name: markdownEditorState.inputMarkdownValue }
        : item
    );
    setMarkdownEditorState((prev) => ({ ...prev, data: savedMarkdownName }));
  };

  return (
    <NavigationMenu.List
      className={`flex items-center pr-2 sm:pr-4 justify-between bg-800`}
    >
      <NavigationMenu.Item className="flex items-center justify-center bg-700 h-[56px] sm:h-[72px] aspect-square mr-6">
        <NavigationMenu.Trigger
          title="toggle sidebar"
          type="button"
          aria-controls={undefined}
          onPointerMove={(e) => e.preventDefault()}
          onPointerLeave={(e) => e.preventDefault()}
        >
          <HamburgerIcon />
        </NavigationMenu.Trigger>
      </NavigationMenu.Item>

      <NavigationMenu.Item className="hidden lg:block">
        <Image src={logo} alt="web logo" loading={undefined} />
      </NavigationMenu.Item>
      <NavigationMenu.Item className="hidden lg:block ml-7 mr-6 h-10 w-[1px] bg-600"></NavigationMenu.Item>
      <NavigationMenu.Item className="mr-auto">
        <InputText />
      </NavigationMenu.Item>
      <NavigationMenu.Item className="mr-6 flex items-center ml-2">
        <NavigationMenu.Trigger
          onPointerMove={(e) => e.preventDefault()}
          onPointerLeave={(e) => e.preventDefault()}
          disabled={markdownEditorState.data.length ? false : true}
          title="delete markdown"
          onClick={() =>
            setMarkdownEditorState((prev) => ({
              ...prev,
              isDeleteModalOpen: true,
            }))
          }
        >
          <FaRegTrashAlt
            className={`text-500 text-previewH4 ${
              markdownEditorState.data.length && "hover:text-orange"
            }`}
          />
        </NavigationMenu.Trigger>
      </NavigationMenu.Item>
      <NavigationMenu.Item className="">
        <NavigationMenu.Trigger
          onPointerMove={(e) => e.preventDefault()}
          onPointerLeave={(e) => e.preventDefault()}
          title="save changes"
          disabled={markdownEditorState.data.length ? false : true}
          onClick={saveChanges}
          className="bg-[#b75236] enabled:hover:bg-orangeHover 
               text-100 rounded text-headingM font-roboto h-10 w-10 sm:w-auto sm:px-4 flex justify-center items-center"
        >
          <LuSave className="text-[1.3rem] sm:mr-2" />
          {windowWidth >= 640 && "Save changes"}
        </NavigationMenu.Trigger>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  );
};
export default Navbar;
