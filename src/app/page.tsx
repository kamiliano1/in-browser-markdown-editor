"use client";
import useWindowWith from "@/hooks/useWindowWidth";
import MarkdownEditor from "@/layout/MarkdownEditors/MarkdownEditor";
import MarkdownPreview from "@/layout/MarkdownEditors/MarkdownPreview";
import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import data from "./data/data.json";
import { editorState } from "@/atoms/markdownAtom";
import { useRecoilState } from "recoil";
import DeleteModal from "@/layout/Modal/DeleteModal/DeleteModal";
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
    }));
  }, [setMarkdownEditorState]);

  return (
    <main className="overflow-hidden">
      <Navbar />
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
          {windowWidth < 640 ? (
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
        <DeleteModal />
      </div>
    </main>
  );
}
