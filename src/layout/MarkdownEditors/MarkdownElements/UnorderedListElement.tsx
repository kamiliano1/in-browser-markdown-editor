import Link from "next/link";
import React from "react";

type UnorderedListElementProps = {
  item: string;
  isLightMode: boolean;
};

const UnorderedListElement: React.FC<UnorderedListElementProps> = ({
  item,
  isLightMode,
}) => {
  if (
    item.indexOf(")") > item.indexOf("](") &&
    item.indexOf("](") > item.indexOf("[") &&
    item.indexOf("[") > 0
  ) {
    const startSentence = item.slice(2, item.indexOf("["));
    const endSentence = item.slice(item.indexOf(")") + 1);
    const linkName = item.slice(item.indexOf("[") + 1, item.indexOf("]("));
    const linkAddress = item.slice(item.indexOf("](") + 2, item.indexOf(")"));
    return (
      <div
        className={`text-previewParagraph ml-6 mb-1 ${
          !isLightMode ? "text-400" : "text-500"
        }`}
      >
        <span className="w-[3px] mb-1 aspect-square rounded-full bg-orange inline-block mr-3"></span>
        {startSentence}
        <Link className="underline" href={linkAddress}>
          {linkName}
        </Link>
        {endSentence}
      </div>
    );
  }
  return (
    <div
      className={`text-previewParagraph ml-6 mb-1 ${
        !isLightMode ? "text-400" : "text-500"
      }`}
    >
      <span className="w-[3px] mb-1 aspect-square rounded-full bg-orange inline-block mr-3"></span>
      <span className="text-end">{item.slice(2)}</span>
    </div>
  );
};
export default UnorderedListElement;
