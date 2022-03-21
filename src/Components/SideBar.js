import { useRef, useState } from "react";
import { FaHome } from "react-icons/fa";
import {
  MdVideoCameraBack,
  MdTravelExplore,
  MdOutlineHistory,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { BsMoonStarsFill } from "react-icons/bs";

import Popper from "./Popper";
import ArrowPopper from "./ArrowPopper";
import { showPopper } from "../Shared";

function SideBar() {
  const { language } = useSelector((state) => state.root);

  const [sideBarInfo, setSiBarInfo] = useState([
    {
      icon: <FaHome />,
      title: language.sideBar1,
    },
    {
      icon: <MdVideoCameraBack />,
      title: language.sideBar2,
    },
    {
      icon: <MdTravelExplore />,
      title: language.sideBar3,
    },
    {
      icon: <MdOutlineHistory />,
      title: language.sideBar4,
    },
  ]);

  const buttonRef = useRef(null);
  const popperRef = useRef(null);

  return (
    <div className="fixed flex flex-col top-0 left-0 w-64 bg-gray-100 dark:bg-gray-900/[0.9] h-full border-r dark:border-gray-800">
      <div className="flex items-center justify-center h-14 ">
        <div>Sidebar Navigation By iAmine</div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 pb-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-xl font-light tracking-wide text-gray-800 dark:text-white font-bold">
                {language.homeTitle}
              </div>
            </div>
          </li>
          {sideBarInfo.map((item, index) => {
            const { icon, title } = item;
            return (
              <li key={index}>
                <a
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none transition-all capitalize duration-500 ease-linear font-medium hover:bg-gray-200 hover:dark:bg-gray-300/[0.3] text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:dark:text-white border-l-4 border-transparent hover:border-indigo-500 border-indigo-500 pr-6"
                >
                  <span className="inline-flex text-2xl justify-center items-center ml-4">
                    {icon}
                  </span>
                  <span className="ml-2 text-base tracking-wide truncate">
                    {title}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <Manager>
        <Target>abc</Target>
        <Popper>aaa</Popper>
      </Manager> */}
    </div>
  );
}

export default SideBar;
