import Link from "next/link";
import React from "react";

type H2ElementProps = {
  item: string;
  isLightMode: boolean;
};

const H2Element: React.FC<H2ElementProps> = ({ item, isLightMode }) => {
  if (
    item.indexOf(")") > item.indexOf("](") &&
    item.indexOf("](") > item.indexOf("[") &&
    item.indexOf("[") > 0
  ) {
    const startSentence = item.slice(3, item.indexOf("["));
    const endSentence = item.slice(item.indexOf(")") + 1);
    const linkName = item.slice(item.indexOf("[") + 1, item.indexOf("]("));
    const linkAddress = item.slice(item.indexOf("](") + 2, item.indexOf(")"));
    return (
      <h2
        className={`text-previewH2 my-5  ${
          !isLightMode ? "text-100" : "text-700"
        }`}
      >
        {startSentence}
        <Link className="underline" href={linkAddress}>
          {linkName}
        </Link>
        {endSentence}
      </h2>
    );
  }
  return (
    <h2
      className={`text-previewH2 my-5 ${
        !isLightMode ? "text-100" : "text-700"
      }`}
    >
      {item.slice(3)}
    </h2>
  );
};
export default H2Element;
