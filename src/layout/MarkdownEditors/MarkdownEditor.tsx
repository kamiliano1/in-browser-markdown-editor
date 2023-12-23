import { MarkdownDataType, editorState } from "@/atoms/markdownAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import React, { useEffect, useRef, useState } from "react";
import { FiEye } from "react-icons/fi";
import { useRecoilState } from "recoil";

type MarkdownEditorProps = {};

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({}) => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const windowWidth = useWindowWith();
  const [activatedMarkdown, setActivatedMarkdown] = useState<MarkdownDataType>(
    markdownEditorState.data[1]
  );
  const [isCharacterUpdated, setIsCharacterUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (!markdownEditorState.isReloaded) {
      setActivatedMarkdown(
        markdownEditorState.data.filter(
          (item) => item.id === markdownEditorState.activeMarkdownId
        )[0]
      );
      setMarkdownEditorState((prev) => ({ ...prev, isReloaded: true }));
    }
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [
    markdownEditorState.activeMarkdownId,
    markdownEditorState.data,
    markdownEditorState.isReloaded,
    setMarkdownEditorState,
  ]);
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
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
    const { name, value } = e.target;
    console.log(value);
    setActivatedMarkdown((prev) => ({ ...prev, [name]: value }));
    setIsCharacterUpdated(true);
  };
  useEffect(() => {
    if (isCharacterUpdated) {
      setMarkdownEditorState((prev) => {
        const updatedMarkdown = markdownEditorState.data.map((item) =>
          item.id === markdownEditorState.activeMarkdownId
            ? activatedMarkdown
            : item
        );
        return { ...prev, data: updatedMarkdown };
      });
      setIsCharacterUpdated(false);
    }
  }, [
    activatedMarkdown,
    isCharacterUpdated,
    markdownEditorState.activeMarkdownId,
    markdownEditorState.data,
    setMarkdownEditorState,
  ]);
  return (
    <div
      className={`w-full ${
        windowWidth > 640 &&
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
          className={`text-headingS uppercase font-roboto ${
            !markdownEditorState.isLightMode ? "text-400" : "text-500"
          }`}
        >
          Markdown
        </h1>

        <FiEye
          onClick={switchPart}
          className={`sm:hidden hover:text-orange cursor-pointer ${
            !markdownEditorState.isLightMode ? "text-400" : "text-500"
          }`}
        />
      </div>

      <textarea
        onChange={onChange}
        name="content"
        id="content"
        aria-label="markdown Editor"
        title="markdown Editor"
        ref={textAreaRef}
        disabled={markdownEditorState.data.length ? false : true}
        value={
          markdownEditorState.data.length ? activatedMarkdown?.content : ""
        }
        className={`px-4 py-2 w-full resize-none font-robotoMono text-markdown 
        min-h-[calc(100vh_-_127px)] 
        ${
          !markdownEditorState.isLightMode
            ? "bg-1000 text-400"
            : "bg-100 text-700"
        }`}
      ></textarea>
    </div>
  );
};
export default MarkdownEditor;
