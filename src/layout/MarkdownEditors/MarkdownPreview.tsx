import { editorState } from "@/atoms/markdownAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRecoilState } from "recoil";
import MarkdownPrint from "./MarkdownPrint";
import Markdown from "react-markdown";

type MarkdownPreviewProps = {};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({}) => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const windowWidth = useWindowWith();
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
  const [activatedMarkdownContent, setActivatedMarkdownContent] =
    useState<string>("");
  useEffect(() => {
    if (markdownEditorState.data.length) {
      setActivatedMarkdownContent(
        markdownEditorState.data.filter(
          (item) => item.id === markdownEditorState.activeMarkdownId
        )[0]?.content
      );
      setMarkdownEditorState((prev) => ({ ...prev, isReloaded: true }));
    }
  }, [
    activatedMarkdownContent,
    markdownEditorState.activeMarkdownId,
    markdownEditorState.data,
    setMarkdownEditorState,
  ]);
  const sprawdz = () => {
    const stringg = `[1](2) [markdown hest](https://www.markdownguide.org/cheat-sheet/). This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdowns](https://www.markdownguide.org/cheat-sheet/).`;
    // if (
    //   stringg.indexOf(")") > stringg.indexOf("](") &&
    //   stringg.indexOf("](") > stringg.indexOf("[") &&
    //   stringg.indexOf("[") > 0
    // ) {
    //   const startSentence = stringg.slice(2, stringg.indexOf("["));
    //   const endSentence = stringg.slice(stringg.indexOf(")") + 1);
    //   const linkName = stringg.slice(
    //     stringg.indexOf("[") + 1,
    //     stringg.indexOf("](")
    //   );
    //   const linkAddress = stringg.slice(
    //     stringg.indexOf("](") + 2,
    //     stringg.indexOf(")")
    //   );
    // }
    const ifLink = (link: string) => {
      if (
        link.indexOf(")") > link.indexOf("](") &&
        link.indexOf("](") > link.indexOf("[") &&
        link.indexOf("[") >= 0
      )
        return true;
      return false;
    };
    let myIndex = 0;
    let newString = "";
    for (let index = 0; index < 30; index++) {
      // console.log(myIndex);
      // if (index > stringg.length) return;
      let testString = stringg.slice(myIndex);

      // if (testString.indexOf("](") === -1) return;
      // index = testString.indexOf("](");
      if (ifLink(testString)) {
        myIndex = stringg.length - testString.length + testString.indexOf(")");

        const startSentence = testString.slice(0, testString.indexOf("["));
        const endSentence = testString.slice(testString.indexOf(")") + 1);
        const linkName = testString.slice(
          testString.indexOf("[") + 1,
          testString.indexOf("](")
        );
        const linkAddress = testString.slice(
          testString.indexOf("](") + 2,
          testString.indexOf(")")
        );
        newString += startSentence + linkName + linkName;
      } else {
        myIndex++;
      }
    }
    console.log(newString);
  };

  return (
    <div className="w-full">
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
        className={`p-4 w-full h-[calc(100vh_-_117px)]  ${
          !markdownEditorState.isLightMode
            ? "bg-1000 text-400"
            : "bg-100 text-700"
        }`}
      >
        <div
          className={`markdown max-w-[981px] px-2.5  ${
            markdownEditorState.activatedMarkdownPart === "Markdown" &&
            "mx-auto"
          }`}
        >
          {/* {markdownEditorState.data.length ? <MarkdownPrint /> : ""} */}
          <Markdown
            className={`flex flex-col gap-2 ${
              !markdownEditorState.isLightMode && "lightMode"
            }`}
          >
            {activatedMarkdownContent}
          </Markdown>
        </div>
      </div>
    </div>
  );
};
export default MarkdownPreview;
