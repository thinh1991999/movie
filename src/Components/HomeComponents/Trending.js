import { IoPlayCircleOutline, IoEyeSharp } from "react-icons/io5";
import { getImageUrl } from "../../Shared";
import Loading from "../Loading";
import { AiFillStar } from "react-icons/ai";
import Options from "./Options";

function Trending({ data, chooseTrending }) {
  if (!data) {
    return (
      <div className="w-1/5 md:block hidden pr-4 py-5 h-[calc(100vh_-_4rem)] fixed right-[12px] bottom-0 overflow-y-hidden hover:overflow-y-scroll  scroll-list">
        <h2 className="font-normal text-gray-800 dark:text-white text-2xl mb-5 h-[30px] w-[80px]">
          <Loading />
        </h2>
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <div className="flex" key={item}>
              <a className="flex w-full h-[100px] group mb-2 hover:opacity-50 cursor-pointer transition-all duration-300 ease-linear">
                <Loading />
              </a>
            </div>
          );
        })}
      </div>
    );
  }

  const { results } = data;

  return (
    <div className="w-1/5  flex-col md:flex hidden py-5 pt-16 fixed right-[12px] top-0 bottom-0">
      <div className="flex items-center mb-5 justify-between">
        <h2 className="font-normal text-gray-800 dark:text-white text-2xl  ">
          Trending
        </h2>
        <Options mode={"trending"} options={["today", "week"]} />
      </div>
      <div className="flex-1 overflow-hidden hover:overflow-y-auto scroll-list">
        <div className="flex flex-col ">
          {results.map((item, index) => {
            const { id, title, backdrop_path, name, vote_average, popularity } =
              item;

            return (
              <a
                className="flex group mb-2 hover:opacity-50 cursor-pointer transition-all duration-300 ease-linear"
                key={id}
              >
                <div className="relative w-[40%]">
                  <img
                    src={getImageUrl(backdrop_path, "w500")}
                    alt={title || name}
                    className="rounded-lg w-full h-[80px] object-cover object-center"
                  />
                  <div className="absolute opacity-0 group-hover:opacity-100 top-0 left-0 right-0 bottom-0 flex items-center justify-center text-3xl text-white">
                    <IoPlayCircleOutline />
                  </div>
                </div>
                <div className="w-[60%] ml-2">
                  <span className="overflow-hidden w-full text-gray-800 dark:text-white  sub-title">
                    {title || name}
                  </span>
                  <div className="mt-2 flex text-gray-800 dark:text-white items-center text-xs">
                    <AiFillStar className="text-yellow-500 dark:text-yellow-400 text-sm" />
                    <span>{vote_average}</span>
                  </div>
                  <div className="mt-2 flex text-gray-800 dark:text-white items-center text-xs">
                    <IoEyeSharp className="text-yellow-500 dark:text-yellow-400 text-sm" />
                    <span>{popularity}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Trending;
