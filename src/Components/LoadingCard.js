import React from "react";
import Loading from "./Loading";

export default function LoadingCard() {
  return (
    <div className="flex flex-wrap">
      <div className="h-[300px] w-full smm2:w-1/2 smm:w-1/3 mdd:w-1/4  lgg:w-1/5 xll:w-1/6 p-2">
        <Loading />
      </div>
      <div className="h-[300px] hidden smm2:block smm2:w-1/2 smm:w-1/3 mdd:w-1/4  lgg:w-1/5 xll:w-1/6 p-2">
        <Loading />
      </div>
      <div className="h-[300px] hidden smm:block smm:w-1/3 mdd:w-1/4  lgg:w-1/5 xll:w-1/6 p-2">
        <Loading />
      </div>
      <div className="h-[300px] hidden mdd:block mdd:w-1/4   lgg:w-1/5 xll:w-1/6 p-2">
        <Loading />
      </div>
      <div className="h-[300px] hidden lgg:block lgg:w-1/5 xll:w-1/6 p-2">
        <Loading />
      </div>
      <div className="h-[300px] hidden xll:block xll:w-1/6 p-2">
        <Loading />
      </div>
    </div>
  );
}
