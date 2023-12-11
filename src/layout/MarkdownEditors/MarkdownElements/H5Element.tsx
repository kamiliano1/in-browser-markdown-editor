import Link from "next/link";
import React from "react";

type H5ElementProps = {
  item: string;
  isLightMode: boolean;
};

const H5Element: React.FC<H5ElementProps> = ({ item, isLightMode }) => {
  if (
    item.indexOf(")") > item.indexOf("](") &&
    item.indexOf("](") > item.indexOf("[") &&
    item.indexOf("[") > 0
  ) {
    const startSentence = item.slice(6, item.indexOf("["));
    const endSentence = item.slice(item.indexOf(")") + 1);
    const linkName = item.slice(item.indexOf("[") + 1, item.indexOf("]("));
    const linkAddress = item.slice(item.indexOf("](") + 2, item.indexOf(")"));
    return (
      <h5
        className={`text-previewH5 my-5  ${
          !isLightMode ? "text-100" : "text-700"
        }`}
      >
        {startSentence}
        <Link className="underline" href={linkAddress}>
          {linkName}
        </Link>
        {endSentence}
      </h5>
    );
  }
  return (
    <h5
      className={`text-previewH5 my-5 ${
        !isLightMode ? "text-100" : "text-700"
      }`}
    >
      {item.slice(6)}
    </h5>
  );
};
export default H5Element;
