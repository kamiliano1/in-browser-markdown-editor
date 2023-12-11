import Link from "next/link";
import React from "react";

type BlockquoteElementProps = {
  item: string;
  isLightMode: boolean;
};

const BlockquoteElement: React.FC<BlockquoteElementProps> = ({
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
      <p
        className={`text-previewParagraphBold p-6 my-6 border-l-[4px] border-l-orange bg-200 ${
          !isLightMode ? "text-100 bg-800" : "text-700 bg-200"
        }`}
      >
        {startSentence}
        <Link className="underline" href={linkAddress}>
          {linkName}
        </Link>
        {endSentence}
      </p>
    );
  }
  return (
    <p
      className={`text-previewParagraphBold p-6 my-6 border-l-[4px] border-l-orange bg-200 ${
        !isLightMode ? "text-100 bg-800" : "text-700 bg-200"
      }`}
    >
      {item.slice(2)}
    </p>
  );
};
export default BlockquoteElement;
