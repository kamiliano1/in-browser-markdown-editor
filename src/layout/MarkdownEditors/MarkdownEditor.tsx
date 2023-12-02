import { MarkdownDataType, editorState } from "@/atoms/markdownAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { useRecoilState } from "recoil";

type MarkdownEditorProps = {};

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({}) => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const windowWidth = useWindowWith();
  const [activatedMarkdown, setActivatedMarkdown] = useState<MarkdownDataType>(
    markdownEditorState.data[0]
  );

  useEffect(() => {
    setActivatedMarkdown(
      markdownEditorState.data.filter(
        (item) => item.id === markdownEditorState.activeMarkdownId
      )[0]
    );
  }, [markdownEditorState.activeMarkdownId, markdownEditorState.data]);
  const switchPart = () => {
    setMarkdownEditorState((prev) => ({
      ...prev,
      activatedMarkdownPart:
        markdownEditorState.activatedMarkdownPart === "Markdown"
          ? "Preview"
          : "Markdown",
    }));
  };

  return (
    <div
      className={`w-full sm:border-r-[1px] border-r-600 ${
        windowWidth > 500 &&
        markdownEditorState.activatedMarkdownPart === "Markdown" &&
        "hidden"
      }`}
    >
      <div
        className={`flex px-4 py-3 items-center ${
          !markdownEditorState.isLightMode ? "bg-900" : "bg-200"
        } justify-between`}
      >
        <h1
          className={`text-headingS uppercase  ${
            !markdownEditorState.isLightMode ? "text-400" : "text-500"
          }`}
        >
          Markdown
        </h1>

        <FiEye
          onClick={switchPart}
          className={`sm:hidden ${
            !markdownEditorState.isLightMode ? "text-400" : "text-500"
          }`}
        />
      </div>
      <textarea
        value={activatedMarkdown.content}
        className={`p-4 w-full h-[calc(100vh_-_108px)]  ${
          !markdownEditorState.isLightMode
            ? "bg-1000 text-400"
            : "bg-100 text-700"
        }`}
      ></textarea>
      ;
    </div>
  );
};
export default MarkdownEditor;
