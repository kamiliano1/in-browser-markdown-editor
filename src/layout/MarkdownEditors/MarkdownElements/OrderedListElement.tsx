import Link from "next/link";
import React from "react";

type OrderedListElementProps = {
  item: string;
  isLightMode: boolean;
};

const OrderedListElement: React.FC<OrderedListElementProps> = ({
  item,
  isLightMode,
}) => {
  const numberLength = item.split(".")[0].length + 2;
  if (
    item.indexOf(")") > item.indexOf("](") &&
    item.indexOf("](") > item.indexOf("[") &&
    item.indexOf("[") > 0
  ) {
    const startSentence = item.slice(numberLength, item.indexOf("["));
    const endSentence = item.slice(item.indexOf(")") + 1);
    const linkName = item.slice(item.indexOf("[") + 1, item.indexOf("]("));
    const linkAddress = item.slice(item.indexOf("](") + 2, item.indexOf(")"));
    return (
      <div
        className={`text-previewParagraph ml-6 mb-1 ${
          !isLightMode ? "text-400" : "text-500"
        }`}
      >
        <span className="min-w-[20px] text-end mr-2">
          {item.split(".")[0]}.
        </span>
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
      <span className="min-w-[20px] text-end mr-2">{item.split(".")[0]}.</span>
      <span>{item.slice(numberLength)}</span>
    </div>
  );
};
export default OrderedListElement;
