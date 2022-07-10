import React from "react";
import Card from "../Card";

export default function Items({ items }) {
  return (
    <>
      <div className="flex flex-wrap">
        {items?.map((item) => {
          return (
            <div className=" lgg:w-1/5 mdd:w-1/4 smm:w-1/3 smm2:w-1/2 w-full">
              <Card data={item} typeNavigate="person" />
            </div>
          );
        })}
      </div>
    </>
  );
}
