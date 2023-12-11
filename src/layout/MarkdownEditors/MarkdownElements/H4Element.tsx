import Link from "next/link";
import React from "react";

type H4ElementProps = {
  item: string;
  isLightMode: boolean;
};

const H4Element: React.FC<H4ElementProps> = ({ item, isLightMode }) => {
  if (
    item.indexOf(")") > item.indexOf("](") &&
    item.indexOf("](") > item.indexOf("[") &&
    item.indexOf("[") > 0
  ) {
    const startSentence = item.slice(5, item.indexOf("["));
    const endSentence = item.slice(item.indexOf(")") + 1);
    const linkName = item.slice(item.indexOf("[") + 1, item.indexOf("]("));
    const linkAddress = item.slice(item.indexOf("](") + 2, item.indexOf(")"));
    return (
      <h4
        className={`text-previewH4 my-5  ${
          !isLightMode ? "text-100" : "text-700"
        }`}
      >
        {startSentence}
        <Link className="underline" href={linkAddress}>
          {linkName}
        </Link>
        {endSentence}
      </h4>
    );
  }
  return (
    <h4
      className={`text-previewH4 my-5 ${
        !isLightMode ? "text-100" : "text-700"
      }`}
    >
      {item.slice(5)}
    </h4>
  );
};
export default H4Element;
