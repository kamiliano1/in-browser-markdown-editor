import { MarkdownDataType, editorState } from "@/atoms/markdownAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import Link from "next/link";
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
  let numbersArray = new Array(100).fill("");
  numbersArray = numbersArray.map((item, id) => `${id + 1}. `);
  const MarkdownPrint = () => {
    return printedMarkdown.map((item, id) => {
      // console.log(item.indexOf("["), "[");
      // console.log(item.indexOf("]("), "](");
      // console.log(item.indexOf(")"), ")");
      if ((item.indexOf("[") && item.indexOf("](") && item.indexOf(")")) > 0) {
        const startSentence = item.slice(2, item.indexOf("["));
        const endSentence = item.slice(item.indexOf(")") + 1);
        const linkName = item.slice(item.indexOf("[") + 1, item.indexOf("]("));
        const linkAddress = item.slice(
          item.indexOf("](") + 2,
          item.indexOf(")")
        );
        return (
          <p key={item}>
            {startSentence}
            <Link className="underline" href={linkAddress}>
              {linkName}
            </Link>
            {endSentence}
          </p>
        );
      }
      var result = numbersArray.findIndex((element) =>
        item.startsWith(element)
      );
      if (result >= 0) {
        const numberLength = item.split(".")[0].length + 2;
        return (
          <div
            key={id}
            className={`text-previewParagraph ml-6 mb-1 flex ${
              !markdownEditorState.isLightMode ? "text-400" : "text-500"
            }`}
          >
            <span className="min-w-[20px] text-end">{item.split(".")[0]}.</span>
            <span className="ml-2">{item.slice(numberLength)}</span>
          </div>
        );
      }
      if (item.startsWith("- ")) {
        return (
          <div
            key={id}
            className={`text-previewParagraph ml-6 mb-1 flex items-center ${
              !markdownEditorState.isLightMode ? "text-400" : "text-500"
            }`}
          >
            <span className="w-[3px] aspect-square rounded-full bg-orange "></span>
            <span className="text-end ml-6">{item.slice(2)}</span>
          </div>
        );
      }
      if (item.startsWith("> ")) {
        return (
          <p
            key={id}
            className={`text-previewParagraphBold p-6 my-6 border-l-[4px] border-l-orange bg-200 ${
              !markdownEditorState.isLightMode
                ? "text-100 bg-800"
                : "text-700 bg-200"
            }`}
          >
            {item.slice(2)}
          </p>
        );
      }
      if (item.startsWith("# ")) {
        return (
          <h1
            key={id}
            className={`text-previewH1 my-5  ${
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
            className={`text-previewH2 my-5 ${
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
            className={`text-previewH3 my-5 ${
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
            className={`text-previewH4 my-5 ${
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
            className={`text-previewH5 my-5 ${
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
            className={`text-previewH6 my-5 ${
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
        <div className="max-w-[981px] mx-auto flex flex-col">
          <MarkdownPrint />
        </div>
      </div>
    </div>
  );
};
export default MarkdownPreview;
