import { editorState } from "@/atoms/markdownAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRecoilState } from "recoil";
import Markdown from "react-markdown";

type MarkdownPreviewProps = {};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({}) => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const windowWidth = useWindowWith();
  const switchPart = () => {
    setMarkdownEditorState((prev) => ({
      ...prev,
      isReloaded: false,
      activatedMarkdownPart:
        markdownEditorState.activatedMarkdownPart === "Markdown"
          ? "Preview"
          : "Markdown",
    }));
  };
  const [activatedMarkdownContent, setActivatedMarkdownContent] =
    useState<string>("");
  useEffect(() => {
    if (markdownEditorState.data.length) {
      setActivatedMarkdownContent(
        markdownEditorState.data.filter(
          (item) => item.id === markdownEditorState.activeMarkdownId
        )[0]?.content
      );
      setMarkdownEditorState((prev) => ({ ...prev, isReloaded: true }));
    }
  }, [
    activatedMarkdownContent,
    markdownEditorState.activeMarkdownId,
    markdownEditorState.data,
    setMarkdownEditorState,
  ]);

  return (
    <div className="w-full border-l-[1px] border-600 ">
      <div
        className={`flex px-4 py-3 items-center    ${
          !markdownEditorState.isLightMode ? "bg-900" : "bg-200"
        } justify-between`}
      >
        <h1
          className={`text-headingS uppercase font-roboto  ${
            !markdownEditorState.isLightMode ? "text-400" : "text-500"
          }`}
        >
          Preview
        </h1>
        {windowWidth > 640 ? (
          <>
            {markdownEditorState.activatedMarkdownPart === "Markdown" ? (
              <FiEyeOff
                onClick={switchPart}
                className={`hover:text-orange cursor-pointer ${
                  !markdownEditorState.isLightMode ? "text-400" : "text-500"
                }`}
              />
            ) : (
              <FiEye
                onClick={switchPart}
                className={`hover:text-orange cursor-pointer ${
                  !markdownEditorState.isLightMode ? "text-400" : "text-500"
                }`}
              />
            )}
          </>
        ) : (
          <FiEyeOff
            onClick={switchPart}
            className={`hover:text-orange cursor-pointer ${
              !markdownEditorState.isLightMode ? "text-400" : "text-500"
            }`}
          />
        )}
      </div>
      <div
        className={`px-5 py-4 w-full h-[calc(100vh_-_117px)]  ${
          !markdownEditorState.isLightMode
            ? "bg-1000 text-400"
            : "bg-100 text-700"
        }`}
      >
        <div
          className={`markdown max-w-[981px]  ${
            markdownEditorState.activatedMarkdownPart === "Markdown" &&
            "mx-auto"
          }`}
        >
          <span className="h-[100vh] bg-600 w-[3px]"></span>

          <Markdown
            className={`flex flex-col gap-5 pb-14  ${
              !markdownEditorState.isLightMode && "lightMode"
            }`}
          >
            {activatedMarkdownContent}
          </Markdown>
        </div>
      </div>
    </div>
  );
};
export default MarkdownPreview;
