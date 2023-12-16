"use client";
import { editorState } from "@/atoms/markdownAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import MarkdownEditor from "@/layout/MarkdownEditors/MarkdownEditor";
import MarkdownPreview from "@/layout/MarkdownEditors/MarkdownPreview";
import DeleteModal from "@/layout/Modal/DeleteModal/DeleteModal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Navbar from "../layout/Navbar/Navbar";
import data from "./data/data.json";
import Navigation from "@/layout/Navbar/Navigation";
export type ActivatedPartType = "Markdown" | "Preview";

export default function Home() {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const windowWidth = useWindowWith();
  useEffect(() => {
    setMarkdownEditorState((prev) => ({
      ...prev,
      data: data,
      activeMarkdownId: data[1].id,
      inputMarkdownValue: data[1].name,
      activeContent: data[1].content,
    }));
  }, [setMarkdownEditorState]);

  return (
    <main
      className={`overflow-x-hidden ${
        !markdownEditorState.isLightMode ? "bg-1000" : "bg-100"
      }`}
    >
      <Navigation />

      <div className="relative h-[100vh]">
        <div
          className={`absolute top-0 left-0 pt-[56px] sm:pt-[72px] transition duration-500 w-full ${
            markdownEditorState.isSidebarOpen && "translate-x-[250px]"
          }`}
        >
          {windowWidth < 640 ? (
            <>
              {markdownEditorState.activatedMarkdownPart === "Markdown" ? (
                <MarkdownPreview />
              ) : (
                <MarkdownEditor />
              )}
            </>
          ) : (
            <div className="flex h-full">
              <MarkdownEditor />
              <MarkdownPreview />
            </div>
          )}
        </div>
        <DeleteModal />
      </div>
    </main>
  );
}
