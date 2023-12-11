import Link from "next/link";
import React from "react";

type H1ElementProps = {
  item: string;
  isLightMode: boolean;
};

const H1Element: React.FC<H1ElementProps> = ({ item, isLightMode }) => {
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
      <h1
        className={`text-previewH1 my-5  ${
          !isLightMode ? "text-100" : "text-700"
        }`}
      >
        {startSentence}
        <Link className="underline" href={linkAddress}>
          {linkName}
        </Link>
        {endSentence}
      </h1>
    );
  }
  return (
    <h1
      className={`text-previewH1 my-5  ${
        !isLightMode ? "text-100" : "text-700"
      }`}
    >
      {item.slice(2)}
    </h1>
  );
};
export default H1Element;
