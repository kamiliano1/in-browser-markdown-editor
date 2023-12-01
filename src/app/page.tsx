"use client";
import useWindowWith from "@/hooks/useWindowWidth";
import MarkdownEditor from "@/layout/MarkdownEditors/MarkdownEditor";
import MarkdownPreview from "@/layout/MarkdownEditors/MarkdownPreview";
import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import data from "./data/data.json";
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
  const [activatedMarkdown, setActivatedMarkdown] = useState<MarkdownDataType>(
    data[0]
  );
  const windowWidth = useWindowWith();
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activatedPart, setActivatedPart] =
    useState<ActivatedPartType>("Markdown");

  useEffect(() => {
    console.log(markdownData.find((item) => item.isActivated === true));
  }, [markdownData]);
  return (
    <main className="overflow-hidden">
      <Navbar
        open={open}
        setOpen={setOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        markdownData={markdownData}
        setMarkdownData={setMarkdownData}
      />
      <div
        className={`relative h-[100vh] ${!isDarkMode ? "bg-1000" : "bg-100"}`}
      >
        <div
          className={`absolute top-0 left-0 pt-[56px] sm:pt-[72px]  
              ${
                open
                  ? " translate-x-[250px] animate-markdownOpen sw-[calc(100%_-_250px)] w-full overflow-hidden"
                  : "animate-markdownClose w-full"
              }
              `}
        >
          {windowWidth < 500 ? (
            <>
              {activatedPart === "Markdown" ? (
                <MarkdownEditor
                  isDarkMode={isDarkMode}
                  activatedPart={activatedPart}
                  setActivatedPart={setActivatedPart}
                  activatedMarkdown={activatedMarkdown}
                  setActivatedMarkdown={setActivatedMarkdown}
                />
              ) : (
                <MarkdownPreview
                  isDarkMode={isDarkMode}
                  activatedPart={activatedPart}
                  setActivatedPart={setActivatedPart}
                  activatedMarkdown={activatedMarkdown}
                  setActivatedMarkdown={setActivatedMarkdown}
                />
              )}
            </>
          ) : (
            <div className="flex">
              <MarkdownEditor
                isDarkMode={isDarkMode}
                activatedPart={activatedPart}
                setActivatedPart={setActivatedPart}
                activatedMarkdown={activatedMarkdown}
                setActivatedMarkdown={setActivatedMarkdown}
              />
              <MarkdownPreview
                isDarkMode={isDarkMode}
                activatedPart={activatedPart}
                setActivatedPart={setActivatedPart}
                activatedMarkdown={activatedMarkdown}
                setActivatedMarkdown={setActivatedMarkdown}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
