import Link from "next/link";
import React from "react";

type H6ElementProps = {
  item: string;
  isLightMode: boolean;
};

const H6Element: React.FC<H6ElementProps> = ({ item, isLightMode }) => {
  if (
    item.indexOf(")") > item.indexOf("](") &&
    item.indexOf("](") > item.indexOf("[") &&
    item.indexOf("[") > 0
  ) {
    const startSentence = item.slice(7, item.indexOf("["));
    const endSentence = item.slice(item.indexOf(")") + 1);
    const linkName = item.slice(item.indexOf("[") + 1, item.indexOf("]("));
    const linkAddress = item.slice(item.indexOf("](") + 2, item.indexOf(")"));
    return (
      <h6
        className={`text-previewH6 my-5  ${
          !isLightMode ? "text-100" : "text-700"
        }`}
      >
        {startSentence}
        <Link className="underline" href={linkAddress}>
          {linkName}
        </Link>
        {endSentence}
      </h6>
    );
  }
  return (
    <h6
      className={`text-previewH6 my-5 ${
        !isLightMode ? "text-100" : "text-700"
      }`}
    >
      {item.slice(7)}
    </h6>
  );
};
export default H6Element;
