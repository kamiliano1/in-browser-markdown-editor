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
    setPrintedMarkdown((prev) => prev.filter((item) => item !== ""));
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

  // type MarkdownType = {
  //   item: string;
  //   id: number;
  //   startWith: string;
  //   font: string;
  //   HtmlElement: string;
  // };

  // const markdownUtility = ({
  //   item,
  //   id,
  //   startWith,
  //   font,
  //   HtmlElement,
  // }: MarkdownType) => {
  //   if (item.startsWith(startWith)) {
  //     return (
  //       <HtmlElement
  //         key={id}
  //         className={`${font}  ${
  //           !markdownEditorState.isLightMode ? "text-100" : "text-700"
  //         }`}
  //       >
  //         {item.slice(startWith.length)}
  //       </HtmlElement>
  //     );
  //   }
  // };

  const MarkdownPrint = () => {
    return printedMarkdown.map((item, id) => {
      // markdownUtility({
      //   item: item,
      //   id: id,
      //   startWith: "# ",
      //   font: "text-previewH1",
      //   HtmlElement: "h1",
      // });
      if (item.startsWith("# ")) {
        return (
          <h1
            key={id}
            className={`text-previewH1  ${
              !markdownEditorState.isLightMode ? "text-100" : "text-700"
            }`}
          >
            {item.slice(2)}
          </h1>
        );
      }
      if (item.startsWith("## ")) {
        return (
          <h2
            key={id}
            className={`text-previewH2  ${
              !markdownEditorState.isLightMode ? "text-100" : "text-700"
            }`}
          >
            {item.slice(3)}
          </h2>
        );
      }
      if (item.startsWith("### ")) {
        return (
          <h3
            key={id}
            className={`text-previewH3  ${
              !markdownEditorState.isLightMode ? "text-100" : "text-700"
            }`}
          >
            {item.slice(4)}
          </h3>
        );
      }
      if (item.startsWith("#### ")) {
        return (
          <h4
            key={id}
            className={`text-previewH4  ${
              !markdownEditorState.isLightMode ? "text-100" : "text-700"
            }`}
          >
            {item.slice(5)}
          </h4>
        );
      }
      if (item.startsWith("##### ")) {
        return (
          <h5
            key={id}
            className={`text-previewH5  ${
              !markdownEditorState.isLightMode ? "text-100" : "text-700"
            }`}
          >
            {item.slice(6)}
          </h5>
        );
      }
      if (item.startsWith("###### ")) {
        return (
          <h5
            key={id}
            className={`text-previewH6  ${
              !markdownEditorState.isLightMode ? "text-100" : "text-700"
            }`}
          >
            {item.slice(7)}
          </h5>
        );
      }
      return <p key={id}>{item}</p>;
    });
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
        <div className="max-w-[981px] mx-auto markdownPrinter flex flex-col gap-5">
          <MarkdownPrint />
          <h1
            className={`text-previewH1  ${
              !markdownEditorState.isLightMode ? "text-100" : "text-700"
            }`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
            deserunt molestias. Iusto ratione sequi debitis qui adipisci dicta
            vel autem.
          </h1>
          <h2
            className={`text-previewH2 ${
              !markdownEditorState.isLightMode ? "text-100" : "text-700"
            }`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
            deserunt molestias. Iusto ratione sequi debitis qui adipisci dicta
            vel autem.
          </h2>
          <h3
            className={`text-previewH3 ${
              !markdownEditorState.isLightMode ? "text-100" : "text-700"
            }`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
            deserunt molestias. Iusto ratione sequi debitis qui adipisci dicta
            vel autem.
          </h3>
          <h4
            className={`text-previewH4 ${
              !markdownEditorState.isLightMode ? "text-100" : "text-700"
            }`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
            deserunt molestias. Iusto ratione sequi debitis qui adipisci dicta
            vel autem.
          </h4>
          <h5
            className={`text-previewH5 ${
              !markdownEditorState.isLightMode ? "text-100" : "text-700"
            }`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
            deserunt molestias. Iusto ratione sequi debitis qui adipisci dicta
            vel autem.
          </h5>
          <h6
            className={`text-previewH6 ${
              !markdownEditorState.isLightMode ? "text-100" : "text-700"
            }`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
            deserunt molestias. Iusto ratione sequi debitis qui adipisci dicta
            vel autem.
          </h6>
        </div>
      </div>
    </div>
  );
};
export default MarkdownPreview;
