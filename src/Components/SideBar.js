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
import { Link, useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();

  const { language, theme, showNavMobile } = useSelector((state) => state.root);

  const [sideBarInfo, setSiBarInfo] = useState([
    {
      icon: <FaHome />,
      title: language.sideBar1,
      link: "/",
    },
    {
      icon: <MdVideoCameraBack />,
      title: language.sideBar2,
      link: "/",
    },
    {
      icon: <MdTravelExplore />,
      title: language.sideBar3,
      link: "/explored",
    },
    {
      icon: <MdOutlineHistory />,
      title: language.sideBar4,
      link: "/",
    },
  ]);

  const buttonRef = useRef(null);
  const popperRef = useRef(null);

  return (
    <div
      className={`fixed ${
        showNavMobile ? "w-3/4" : "w-0"
      } transition-all duration-300 ease-linear z-20 overflow-hidden  lg:w-1/6 md:w-[calc(100%/16)] flex flex-col top-0 left-0 bg-gray-100 dark:bg-gray-900 h-full border-r dark:border-gray-800`}
    >
      <div className="flex items-center lg:justify-start lg:pl-4 h-14 md:pl-0 md:justify-center justify-start pl-4">
        <div className="flex items-center cursor-pointer ">
          {theme === "dark" ? (
            <img
              src="/iconWhite.png"
              alt=""
              className="w-10 h-10 object-cover"
            />
          ) : (
            <img src="/icon.png" alt="" className="w-10 h-10 object-cover" />
          )}
          <span className="text-gray-800 text-xl font-bold font-sans dark:text-white lg:block md:hidden">
            ChillTime
          </span>
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 pb-5 lg:block md:hidden">
            <div className="flex flex-row items-center h-8">
              <div className="text-xl font-light tracking-wide text-gray-800 dark:text-white font-bold">
                {language.homeTitle}
              </div>
            </div>
          </li>
          {sideBarInfo.map((item, index) => {
            const { icon, title, link } = item;
            return (
              <li key={index}>
                <Link
                  to={link}
                  className="relative flex lg:justify-start md:justify-center flex-row items-center h-11 focus:outline-none transition-all capitalize duration-500 ease-linear font-medium hover:bg-gray-200 hover:dark:bg-gray-300/[0.3] text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:dark:text-white border-l-4 border-transparent hover:border-indigo-500 border-indigo-500 md:pr-0 pr-6"
                >
                  <span className="inline-flex text-2xl justify-center items-center lg:ml-4 md:ml-0 ml-4">
                    {icon}
                  </span>
                  <span className="ml-2 lg:block md:hidden text-base tracking-wide truncate">
                    {title}
                  </span>
                </Link>
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
