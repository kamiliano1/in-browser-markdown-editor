import Link from "next/link";
import React from "react";

type H3ElementProps = {
  item: string;
  isLightMode: boolean;
};

const H3Element: React.FC<H3ElementProps> = ({ item, isLightMode }) => {
  if (
    item.indexOf(")") > item.indexOf("](") &&
    item.indexOf("](") > item.indexOf("[") &&
    item.indexOf("[") > 0
  ) {
    const startSentence = item.slice(4, item.indexOf("["));
    const endSentence = item.slice(item.indexOf(")") + 1);
    const linkName = item.slice(item.indexOf("[") + 1, item.indexOf("]("));
    const linkAddress = item.slice(item.indexOf("](") + 2, item.indexOf(")"));
    return (
      <h3
        className={`text-previewH3 my-5  ${
          !isLightMode ? "text-100" : "text-700"
        }`}
      >
        {startSentence}
        <Link className="underline" href={linkAddress}>
          {linkName}
        </Link>
        {endSentence}
      </h3>
    );
  }
  return (
    <h3
      className={`text-previewH3 my-5 ${
        !isLightMode ? "text-100" : "text-700"
      }`}
    >
      {item.slice(4)}
    </h3>
  );
};
export default H3Element;
