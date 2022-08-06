import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logo, SquareButton } from "../../Components";

export default function Error({ notFound = false }) {
  const language = useSelector((state) => state.root.language);
  useEffect(() => {
    document.title = language.error;
  }, [language]);
  return (
    <div className="w-screen h-screen  relative bg-black">
      <div className="absolute top-5 left-5">
        <Logo white={true} />
      </div>
      <div className="h-full w-full flex flex-wrap p-[100px] md:py-0 md:px-[100px] overflow-y-scroll">
        <div className="w-full md:w-6/12 flex justify-center items-center">
          <img src="/err.png" className="w-[300px] md:w-[500px]" alt="" />
        </div>
        <div className="w-full md:w-6/12 flex flex-col justify-center items-center text-white">
          <h5 className=" text-3xl lg:text-5xl text-center font-serif tracking-[10px] mb-5">
            AWWW...{language.errDontCry}.
          </h5>
          <span className="text-md lg:text-xl text-gray-400">
            {notFound ? language.errPageNotFound : language.err404}
          </span>
          <p className="text-md lg:text-xl text-center text-gray-400">
            {language.errMess}
          </p>
          <div className="mt-5">
            <Link to={"/"} className="mx-2 px-2 inline-block">
              <SquareButton
                border={true}
                bg={"bg-transparent"}
                color="text-white"
                msg={language.home}
              />
            </Link>
            <button className="mx-2">
              <SquareButton
                border={true}
                bg={"bg-red-600"}
                color="text-white"
                msg={language.reportProblem}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
