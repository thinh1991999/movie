import React from "react";
import { getColorCard } from "../Shared";

export default function ScoreCard({ score }) {
  return (
    <div className="absolute top-2 left-2">
      <div className="relative w-9 h-9 flex items-center justify-center rounded-full bg-black">
        <span className="text-white absolute z-20 w-full h-full  flex justify-center items-center">
          {score?.toFixed(1)}
        </span>
        <div className="slice absolute w-full h-full ">
          {score > 5 ? (
            <div
              className={`absolute w-full h-full border-2 ${getColorCard(
                score
              )} rounded-full`}
              style={{
                clip: `rect(0,20px,40px,0)`,
                transform: `rotate(${180 + (180 / 5) * (score - 5)}deg)`,
              }}
            ></div>
          ) : (
            <div
              className={`absolute w-full h-full bg-black rounded-full z-10`}
              style={{
                clip: `rect(0,20px,40px,0)`,
                transform: `rotate(${0}deg)`,
              }}
            ></div>
          )}
          {score !== 0 && (
            <div
              className={`absolute w-full h-full border-2 ${getColorCard(
                score
              )} rounded-full`}
              style={{
                clip: `rect(0,20px,40px,0)`,
                transform: `${
                  score > 5
                    ? `rotate(180deg)`
                    : `rotate(${(180 / 5) * score}deg)`
                }`,
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
