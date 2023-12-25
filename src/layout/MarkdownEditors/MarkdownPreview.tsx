import { editorState } from "@/atoms/markdownAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Markdown, { ExtraProps } from "react-markdown";
import { useRecoilState } from "recoil";
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

  const addToTOC = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & ExtraProps) => {
    const toc: {
      level: number;
      id: string;
      title: string;
    }[] = [];
    const level = Number(props.node!.tagName.match(/h(\d)/)?.slice(1));
    if (level && children && typeof children === "string") {
      const id = children.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      toc.push({
        level,
        id,
        title: children[0],
      });
      return React.createElement(props.node!.tagName, { id }, children);
    } else {
      return React.createElement(props.node!.tagName, props, children);
    }
  };
  return (
    <div className="w-full">
      <div
        className={`flex px-4 py-3 items-center justify-between ${
          !markdownEditorState.isLightMode
            ? "bg-900 text-400"
            : "bg-200 text-500"
        }`}
      >
        <h1 className={`text-headingS uppercase font-roboto`}>Preview</h1>
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
        className={`px-5 py-4 w-full min-h-[calc(100vh_-_117px)] ${
          !markdownEditorState.isLightMode
            ? "bg-1000 text-400"
            : "bg-100 text-700"
        }`}
      >
        <div
          className={`markdown max-w-[981px] break-words ${
            markdownEditorState.activatedMarkdownPart === "Markdown" &&
            "mx-auto"
          }`}
        >
          <span className="h-[100vh] bg-600 w-[3px]"></span>
          {markdownEditorState.data.length ? (
            <Markdown
              components={{
                h1: addToTOC,
                h2: addToTOC,
                h3: addToTOC,
                h4: addToTOC,
                h5: addToTOC,
                h6: addToTOC,
              }}
              className={`flex flex-col gap-5 pb-14 ${
                !markdownEditorState.isLightMode && "lightMode"
              }`}
            >
              {activatedMarkdownContent}
            </Markdown>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default MarkdownPreview;
