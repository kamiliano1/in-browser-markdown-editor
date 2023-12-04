import { MarkdownDataType, editorState } from "@/atoms/markdownAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRecoilState } from "recoil";
type MarkdownPreviewProps = {};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({}) => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const [activatedMarkdownContent, setActivatedMarkdownContent] =
    useState<string>(markdownEditorState.data[0].content);
  const [printedMarkdown, setPrintedMarkdown] = useState<string[]>([]);
  useEffect(() => {
    setActivatedMarkdownContent(
      markdownEditorState.data.filter(
        (item) => item.id === markdownEditorState.activeMarkdownId
      )[0].content
    );
    setPrintedMarkdown(activatedMarkdownContent.split("\n"));
  }, [
    activatedMarkdownContent,
    markdownEditorState.activeMarkdownId,
    markdownEditorState.data,
  ]);
  const windowWidth = useWindowWith();
  const switchPart = () => {
    setMarkdownEditorState((prev) => ({
      ...prev,
      activatedMarkdownPart:
        markdownEditorState.activatedMarkdownPart === "Markdown"
          ? "Preview"
          : "Markdown",
    }));
  };
  const sprawdz = () => {
    console.log(activatedMarkdownContent.split("\n"));
  };

  return (
    <div className="w-full">
      <button onClick={sprawdz}>Sprawdz</button>
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
        className={`p-4 w-full h-[calc(100vh_-_108px)]  ${
          !markdownEditorState.isLightMode
            ? "bg-1000 text-400"
            : "bg-100 text-700"
        }`}
      >
        <div className="max-w-[981px] mx-auto">
          {printedMarkdown.map((item, id) => {
            if (item === "") return <br></br>;
            return <p key={id}>{item}</p>;
          })}
        </div>
      </div>
    </div>
  );
};
export default MarkdownPreview;
