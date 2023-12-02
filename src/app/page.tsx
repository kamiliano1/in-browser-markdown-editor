"use client";
import useWindowWith from "@/hooks/useWindowWidth";
import MarkdownEditor from "@/layout/MarkdownEditors/MarkdownEditor";
import MarkdownPreview from "@/layout/MarkdownEditors/MarkdownPreview";
import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import data from "./data/data.json";
import { editorState } from "@/atoms/markdownAtom";
import { useRecoilState } from "recoil";
export type ActivatedPartType = "Markdown" | "Preview";
export type MarkdownDataType = {
  createdAt: string;
  name: string;
  content: string;
  isActivated: boolean;
  id: string;
};

export default function Home() {
  const [markdownData, setMarkdownData] = useState<MarkdownDataType[]>(data);

  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const windowWidth = useWindowWith();
  useEffect(() => {
    setMarkdownEditorState((prev) => ({ ...prev, data: data }));
  }, [setMarkdownEditorState]);
  useEffect(() => {
    console.log(markdownData.find((item) => item.isActivated === true));
  }, [markdownData]);
  return (
    <main className="overflow-hidden">
      <Navbar markdownData={markdownData} setMarkdownData={setMarkdownData} />
      <div
        className={`relative h-[100vh] ${
          markdownEditorState.isLightMode ? "bg-1000" : "bg-100"
        }`}
      >
        <div
          className={`absolute top-0 left-0 pt-[56px] sm:pt-[72px] transition duration-500 w-full ${
            markdownEditorState.isSidebarOpen && "translate-x-[250px]"
          }`}
        >
          {windowWidth < 500 ? (
            <>
              {markdownEditorState.activatedMarkdownPart === "Markdown" ? (
                <MarkdownEditor />
              ) : (
                <MarkdownPreview />
              )}
            </>
          ) : (
            <div className="flex">
              <MarkdownEditor />
              <MarkdownPreview />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
