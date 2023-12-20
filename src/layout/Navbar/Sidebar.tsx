import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import logo from "../../../public/logo.svg";
import { generateMarkdownName } from "@/app/utils/generateMarkdownName";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import MarkdownItem from "./MarkdownItem";
import { editorState } from "@/atoms/markdownAtom";
import { useRecoilState } from "recoil";
import { nanoid } from "nanoid";
import Image from "next/image";
type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const addNewMarkdown = () => {
    const addLeadingZeros = (n: number) => {
      return n <= 9 ? "0" + n : n;
    };
    const todayDate = `${addLeadingZeros(
      new Date().getDate()
    )} ${new Date().toLocaleString("en-GB", {
      month: "long",
    })} ${new Date().getFullYear()}`;

    const markdownId = nanoid();
    setMarkdownEditorState((prev) => ({
      ...prev,
      activeMarkdownId: markdownId,
      inputMarkdownValue:
        generateMarkdownName(markdownEditorState) || "untitled-document.md",
      isReloaded: false,
      data: [
        ...prev.data,
        {
          name:
            generateMarkdownName(markdownEditorState) || "untitled-document.md",
          content: "",
          createdAt: todayDate,
          id: markdownId,
        },
      ],
    }));
  };
  return (
    <NavigationMenu.List className="w-[250px] fixed h-[100vh] bg-900 px-6 py-7 flex flex-col">
      <Image src={logo} alt="web logo" className="lg:hidden" />
      <h3 className="text-headingS uppercase text-500 py-7 lg:pt-0 font-roboto">
        My Documents
      </h3>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger
          onPointerMove={(e) => e.preventDefault()}
          onPointerLeave={(e) => e.preventDefault()}
          onClick={addNewMarkdown}
          title="new document"
          className="bg-orange hover:bg-orangeHover w-full py-2.5 mb-6
         text-100 rounded text-headingM font-roboto flex justify-center items-center"
        >
          + New Document
        </NavigationMenu.Trigger>
      </NavigationMenu.Item>
      <div className="max-h-[calc(100vh_-_230px)] overflow-y-auto">
        {markdownEditorState.data?.map((item) => (
          <MarkdownItem key={item.id} data={item} />
        ))}
      </div>
      <NavigationMenu.Item className="mt-auto">
        <ThemeSwitch />
      </NavigationMenu.Item>
    </NavigationMenu.List>
  );
};
export default Sidebar;
