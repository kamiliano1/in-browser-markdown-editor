import { editorState } from "@/atoms/markdownAtom";
import React from "react";
import { useRecoilState } from "recoil";

type HamburgerIconProps = {};

const HamburgerIcon: React.FC<HamburgerIconProps> = () => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  return (
    <div
      className={`w-[23.5px] sm:w-[30px] sm:h-[22.5px] h-[18px] flex flex-col justify-between`}
      onClick={() =>
        setMarkdownEditorState((prev) => ({
          ...prev,
          isSidebarOpen: !prev.isSidebarOpen,
        }))
      }
    >
      <span
        className={`w-full h-[1.56px] bg-300 origin-top-left rounded-xl transition duration-500 ${
          markdownEditorState.isSidebarOpen && "rotate-45"
        }`}
      ></span>
      <span
        className={`w-full h-[1.56px] bg-300 rounded-xl transition duration-500 ${
          markdownEditorState.isSidebarOpen && "opacity-0"
        }
`}
      ></span>
      <span
        className={`w-full h-[1.56px] bg-300 origin-bottom-left rounded-xl transition duration-500 ${
          markdownEditorState.isSidebarOpen && "rotate-[-45deg]"
        }
`}
      ></span>
    </div>
  );
};
export default HamburgerIcon;
