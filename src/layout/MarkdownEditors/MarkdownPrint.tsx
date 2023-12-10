import { editorState } from "@/atoms/markdownAtom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type MarkdownPrintProps = {};

const MarkdownPrint: React.FC<MarkdownPrintProps> = () => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const [activatedMarkdownContent, setActivatedMarkdownContent] =
    useState<string>("");
  const [printedMarkdown, setPrintedMarkdown] = useState<string[]>([]);
  useEffect(() => {
    if (markdownEditorState.data.length) {
      setActivatedMarkdownContent(
        markdownEditorState.data.filter(
          (item) => item.id === markdownEditorState.activeMarkdownId
        )[0]?.content
      );
      setPrintedMarkdown(activatedMarkdownContent.split("\n"));
      setPrintedMarkdown((prev) => prev.filter((item) => item !== ""));
      setMarkdownEditorState((prev) => ({ ...prev, isReloaded: true }));
    }
  }, [
    activatedMarkdownContent,
    markdownEditorState.activeMarkdownId,
    markdownEditorState.data,
    setMarkdownEditorState,
  ]);
  let numbersArray = new Array(100).fill("");
  numbersArray = numbersArray.map((item, id) => `${id + 1}. `);
  return printedMarkdown.map((item, id) => {
    // if (
    //   item.indexOf(")") > item.indexOf("](") &&
    //   item.indexOf("](") > item.indexOf("[")
    // ) {
    //   const startSentence = item.slice(0, item.indexOf("["));
    //   const endSentence = item.slice(item.indexOf(")") + 1);
    //   const linkName = item.slice(item.indexOf("[") + 1, item.indexOf("]("));
    //   const linkAddress = item.slice(
    //     item.indexOf("](") + 2,
    //     item.indexOf(")")
    //   );
    //   return (
    //     <p key={id}>
    //       {startSentence}
    //       <Link className="underline" href={linkAddress}>
    //         {linkName}
    //       </Link>
    //       {endSentence}
    //     </p>
    //   );
    // }
    var result = numbersArray.findIndex((element) => item.startsWith(element));
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
export default MarkdownPrint;
