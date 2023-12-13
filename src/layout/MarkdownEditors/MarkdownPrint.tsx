import { editorState } from "@/atoms/markdownAtom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import H1Element from "./MarkdownElements/H1Element";
import H2Element from "./MarkdownElements/H2Element";
import H3Element from "./MarkdownElements/H3Element";
import H4Element from "./MarkdownElements/H4Element";
import H5Element from "./MarkdownElements/H5Element";
import H6Element from "./MarkdownElements/H6Element";
import BlockquoteElement from "./MarkdownElements/BlockquoteElement";
import OrderedListElement from "./MarkdownElements/OrderedListElement";
import UnorderedListElement from "./MarkdownElements/UnorderedListElement";
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
    var result = numbersArray.findIndex((element) => item.startsWith(element));
    if (result >= 0) {
      return (
        <OrderedListElement
          key={id}
          item={item}
          isLightMode={markdownEditorState.isLightMode}
        />
      );
    }
    if (item.startsWith("- ")) {
      return (
        <UnorderedListElement
          key={id}
          item={item}
          isLightMode={markdownEditorState.isLightMode}
        />
      );
    }
    if (item.startsWith("> ")) {
      return (
        <BlockquoteElement
          key={id}
          item={item}
          isLightMode={markdownEditorState.isLightMode}
        />
      );
    }
    if (item.startsWith("# ")) {
      return (
        <H1Element
          key={id}
          item={item}
          isLightMode={markdownEditorState.isLightMode}
        />
      );
    }
    if (item.startsWith("## ")) {
      return (
        <H2Element
          key={id}
          item={item}
          isLightMode={markdownEditorState.isLightMode}
        />
      );
    }
    if (item.startsWith("### ")) {
      return (
        <H3Element
          key={id}
          item={item}
          isLightMode={markdownEditorState.isLightMode}
        />
      );
    }
    if (item.startsWith("#### ")) {
      return (
        <H4Element
          key={id}
          item={item}
          isLightMode={markdownEditorState.isLightMode}
        />
      );
    }
    if (item.startsWith("##### ")) {
      return (
        <H5Element
          key={id}
          item={item}
          isLightMode={markdownEditorState.isLightMode}
        />
      );
    }
    if (item.startsWith("###### ")) {
      return (
        <H6Element
          key={id}
          item={item}
          isLightMode={markdownEditorState.isLightMode}
        />
      );
    }
    return <p key={id}>{item}</p>;
  });
};
export default MarkdownPrint;
