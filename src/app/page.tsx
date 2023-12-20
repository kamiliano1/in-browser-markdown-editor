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
    <main className="overflow-hidden bg-orange">
      <div
        className={`grid grid-cols-[250px_,_auto] overflow-y-auto ${
          !markdownEditorState.isLightMode ? "bg-1000" : "bg-100"
        } duration-500 w-[calc(100%_+_250px)] ${
          markdownEditorState.isSidebarOpen && "translate-x-[-250px]"
        }`}
      >
        <Navigation />

        <div className={`row-start-2 col-start-2`}>
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
          <DeleteModal />
        </div>
      </div>
    </main>
  );
}
