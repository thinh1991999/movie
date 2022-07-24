import React, { useEffect, useRef, useState } from "react";
import { Info, Password } from "../../Components";
import SubmitButton from "../../Components/SubmitButton";
import { unKnowUserUrl } from "../../Shared";

export default function User() {
  const [navData, setNavData] = useState([
    {
      title: "User info",
      component: <Info />,
    },
    {
      title: "Password",
      component: <Password />,
    },
  ]);
  const [currentNav, setCurrentNav] = useState(0);

  const handleChangeImage = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="h-screen pt-16 pb-20 px-5 w-full overflow-y-scroll scroll-list text-white">
      <div className="flex">
        <div className="w-1/3 flex flex-col justify-center items-center min-h-[450px]">
          <img src={unKnowUserUrl} alt="" className="rounded-full " />
          <div className="">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleChangeImage}
            />
            <SubmitButton
              label={true}
              loading={false}
              title="upload avatar"
              id="image"
            />
          </div>
        </div>
        <div className="w-2/3 ">
          <h3 className="text-3xl font-extrabold">Edit profile</h3>
          <ul className="flex border-b-[1px] border-gray-500 mt-2">
            {navData.map((item, index) => {
              return (
                <li
                  className="px-5 py-3 cursor-pointer relative text-2xl"
                  key={index}
                  onClick={() => setCurrentNav(index)}
                >
                  {item.title}
                  {index === currentNav ? (
                    <span className="absolute left-0 right-0 bottom-[-1px] h-[4px] bg-blue-600 rounded-sm"></span>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <div className="mt-5">{navData[currentNav].component}</div>
        </div>
      </div>
    </div>
  );
}
