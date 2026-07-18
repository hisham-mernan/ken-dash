import React from "react";
import { FullStarIcon, StarIcon } from "../../assets/icons/Icon";

const Rate = ({ rate = 0, maxStars = 5 }) => {
  return (
    <div className="flex  gap-2.5">
      {Array.from({ length: maxStars }, (_, i) => (
        <div key={i}>{rate >= i + 1 ? <FullStarIcon /> : <StarIcon />}</div>
      ))}
    </div>
  );
};

export default Rate;
