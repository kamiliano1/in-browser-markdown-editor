"use client";
import { editorState } from "@/atoms/markdownAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import MarkdownEditor from "@/layout/MarkdownEditors/MarkdownEditor";
import MarkdownPreview from "@/layout/MarkdownEditors/MarkdownPreview";
import DeleteModal from "@/layout/Modal/DeleteModal/DeleteModal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
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
    }));
  }, [setMarkdownEditorState]);

  return (
    <main className="bg-orange overflow-x-hidden overflow-y-auto">
      <div
        className={`grid grid-cols-[250px_,_auto] overflow-auto grid-rows-[56px_,_calc(100vh_-_56px)] sm:grid-rows-[72px_,_calc(100vh_-_72px)] 
      ${
        !markdownEditorState.isLightMode ? "bg-1000" : "bg-100"
      } w-[calc(100%_+_250px)] ${
          !markdownEditorState.isSidebarOpen
            ? "translate-x-[-250px] animate-sidebarOpen"
            : "animate-sidebarClose"
        }`}
      >
        <Navigation />
        <div className={`row-start-2 col-start-2 sm:h-[calc(100vh_-_127px)`}>
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
              {markdownEditorState.activatedMarkdownPart === "Preview" && (
                <span className="w-[2px] bg-600"></span>
              )}
              <MarkdownPreview />
            </div>
          )}
          <DeleteModal />
        </div>
      </div>
    </main>
  );
}
