import { IoPlayCircleOutline } from "react-icons/io5";
import Loading from "../Loading";

function TopSearch({ data }) {
  if (data.length === 0) {
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

  return (
    <div className="w-1/5 md:block hidden py-5 max-h-[calc(100vh_-_4rem)] fixed right-[12px] bottom-0 overflow-y-hidden hover:overflow-y-scroll  scroll-list">
      <h2 className="font-normal text-gray-800 dark:text-white text-2xl mb-5 ">
        Top Search
      </h2>
      <div className="flex flex-col">
        {data.map((item) => {
          const { cover, id, title } = item;
          return (
            <a
              className="flex group mb-2 hover:opacity-50 cursor-pointer transition-all duration-300 ease-linear"
              key={id}
            >
              <div className="relative ">
                <img
                  src={cover}
                  alt={title}
                  className="rounded-lg w-full h-[50px] "
                />
                <div className="absolute opacity-0 group-hover:opacity-100 top-0 left-0 right-0 bottom-0 flex items-center justify-center text-3xl text-white">
                  <IoPlayCircleOutline />
                </div>
              </div>
              <span className="block w-[60%] text-gray-800 dark:text-white ml-2">
                {title}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default TopSearch;
