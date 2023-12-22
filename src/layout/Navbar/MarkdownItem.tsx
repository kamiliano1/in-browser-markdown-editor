import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { MarkdownDataType, editorState } from "@/atoms/markdownAtom";
import { activatedMarkdownName } from "@/app/utils/activatedMarkdownName";
import { CiFileOn } from "react-icons/ci";
import { useRecoilState } from "recoil";
type MarkdownItemProps = {
  data: MarkdownDataType;
};

const MarkdownItem: React.FC<MarkdownItemProps> = ({ data }) => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const { name, createdAt, id } = data;
  const activateMarkdown = () => {
    setMarkdownEditorState((prev) => ({
      ...prev,
      activeMarkdownId: id,
      inputMarkdownValue: activatedMarkdownName(markdownEditorState, id),
      isReloaded: false,
    }));
  };
  return (
    <NavigationMenu.Item
      className="w-full font-roboto mb-6 hover:text-orange text-100"
      onClick={activateMarkdown}
    >
      <NavigationMenu.Trigger
        onPointerMove={(e) => e.preventDefault()}
        onPointerLeave={(e) => e.preventDefault()}
        onClick={(e) => e.preventDefault()}
        title={name}
        type="button"
        className="grid grid-rows-[min-content,_auto] grid-cols-[16px,_auto] gap-x-4 items-center"
      >
        <p className="sr-only">activate markdown document {name}</p>
        <CiFileOn className="row-span-2 text-[1rem] text-100" />
        <p className="text-start text-bodyM text-500 mb-1">{createdAt}</p>
        <p className="text-headingM truncate">{name}</p>
      </NavigationMenu.Trigger>
    </NavigationMenu.Item>
  );
};
export default MarkdownItem;
