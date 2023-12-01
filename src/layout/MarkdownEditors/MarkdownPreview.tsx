import { ActivatedPartType, MarkdownDataType } from "@/app/page";
import useWindowWith from "@/hooks/useWindowWidth";
import React, { Dispatch, SetStateAction } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
type MarkdownPreviewProps = {
  isDarkMode: boolean;
  activatedPart: ActivatedPartType;
  setActivatedPart: Dispatch<SetStateAction<ActivatedPartType>>;
  activatedMarkdown: MarkdownDataType;
  setActivatedMarkdown: Dispatch<SetStateAction<MarkdownDataType>>;
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  isDarkMode,
  setActivatedPart,
  activatedPart,
}) => {
  const windowWidth = useWindowWith();
  const switchPart = () => {
    activatedPart === "Markdown"
      ? setActivatedPart("Preview")
      : setActivatedPart("Markdown");
  };
  return (
    <div className="w-full">
      <div
        className={`flex px-4 py-3 items-center ${
          !isDarkMode ? "bg-900" : "bg-200"
        } justify-between`}
      >
        <h1
          className={`text-headingS uppercase  ${
            !isDarkMode ? "text-400" : "text-500"
          }`}
        >
          Preview
        </h1>
        {windowWidth > 500 ? (
          <>
            {activatedPart === "Markdown" ? (
              <FiEyeOff
                onClick={switchPart}
                className={` ${!isDarkMode ? "text-400" : "text-500"}`}
              />
            ) : (
              <FiEye
                onClick={switchPart}
                className={` ${!isDarkMode ? "text-400" : "text-500"}`}
              />
            )}
          </>
        ) : (
          <FiEyeOff
            onClick={switchPart}
            className={` ${!isDarkMode ? "text-400" : "text-500"}`}
          />
        )}
      </div>
      <textarea
        value={"data[1].content"}
        className={`p-4 w-full h-[calc(100vh_-_108px)]  ${
          !isDarkMode ? "bg-1000 text-400" : "bg-100 text-700"
        }`}
      ></textarea>
      ;
    </div>
  );
};
export default MarkdownPreview;
