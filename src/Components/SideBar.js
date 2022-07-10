import { useEffect, useRef, useState } from "react";
import { FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import {
  MdVideoCameraBack,
  MdTravelExplore,
  MdOutlineHistory,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../Shared";
import { actions } from "../Store";
import Logo from "./Logo";

function SideBar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);
  const theme = useSelector((state) => state.root.theme);
  const showNavMobile = useSelector((state) => state.root.showNavMobile);
  const user = useSelector((state) => state.user.user);

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

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(actions.setUser(null));
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleLogIn = () => {
    dispatch(actions.setPathNameLogin(""));
    navigate("/authen");
  };

  useEffect(() => {
    setSiBarInfo([
      {
        icon: <FaHome />,
        title: language.sideBar1,
        link: "/",
      },
      {
        icon: <MdVideoCameraBack />,
        title: language.sideBar2,
        link: "/actors",
      },
      {
        icon: <MdTravelExplore />,
        title: language.sideBar3,
        link: "/explored",
      },
      {
        icon: <MdOutlineHistory />,
        title: language.sideBar4,
        link: "/c",
      },
    ]);
  }, [language]);

  return (
    <div
      className={`fixed ${
        showNavMobile ? "w-3/4" : "w-0"
      } transition-all duration-300 ease-linear z-20 overflow-hidden  lg:w-1/6 md:w-[calc(100%/16)] flex flex-col top-0 left-0 bg-gray-100 dark:bg-gray-900 h-full border-r dark:border-gray-800`}
    >
      <div className="flex items-center lg:justify-start lg:pl-4 h-14 md:pl-0 md:justify-center justify-start pl-4">
        <Logo />
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
                <NavLink
                  to={link}
                  className={({ isActive }) => {
                    return `relative flex lg:justify-start md:justify-center flex-row items-center h-11 focus:outline-none transition-all capitalize duration-500 ease-linear font-medium hover:bg-gray-200 hover:dark:bg-gray-300/[0.3]  hover:text-gray-900 hover:dark:text-white border-l-4 border-transparent hover:border-indigo-500  md:pr-0 pr-6 ${
                      isActive
                        ? `border-indigo-500 bg-gray-300 dark:bg-gray-300/[0.3] text-gray-900 dark:text-white`
                        : `text-gray-600 dark:text-gray-400`
                    }`;
                  }}
                >
                  <span className="inline-flex text-2xl justify-center items-center lg:ml-4 md:ml-0 ml-4">
                    {icon}
                  </span>
                  <span className="ml-2 lg:block md:hidden text-base tracking-wide truncate">
                    {title}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 pb-5 lg:block md:hidden">
            <div className="flex flex-row items-center h-8">
              <div className="capitalize text-xl font-light tracking-wide text-gray-800 dark:text-white font-bold">
                personal
              </div>
            </div>
          </li>
          {user ? (
            <li className="px-5 lg:block md:hidden">
              <div className="flex flex-row items-center h-8">
                <div className="capitalize tracking-wide text-gray-800 dark:text-white font-bold">
                  {user?.email}
                </div>
              </div>
            </li>
          ) : (
            ""
          )}
          {user ? (
            <li>
              <button
                onClick={handleLogOut}
                className="w-full cursor-pointer text-gray-600 dark:text-gray-400 relative flex lg:justify-start md:justify-center flex-row items-center h-11 focus:outline-none transition-all capitalize duration-500 ease-linear font-medium hover:bg-gray-200 hover:dark:bg-gray-300/[0.3]  hover:text-gray-900 hover:dark:text-white border-l-4 border-transparent hover:border-indigo-500  md:pr-0 pr-6"
              >
                <span className="inline-flex text-2xl justify-center items-center lg:ml-4 md:ml-0 ml-4">
                  <FaSignOutAlt />
                </span>
                <span className="ml-2 lg:block md:hidden text-base tracking-wide truncate">
                  Sign out
                </span>
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogIn}
                className="w-full cursor-pointer text-gray-600 dark:text-gray-400 relative flex lg:justify-start md:justify-center flex-row items-center h-11 focus:outline-none transition-all capitalize duration-500 ease-linear font-medium hover:bg-gray-200 hover:dark:bg-gray-300/[0.3]  hover:text-gray-900 hover:dark:text-white border-l-4 border-transparent hover:border-indigo-500  md:pr-0 pr-6"
              >
                <span className="inline-flex text-2xl justify-center items-center lg:ml-4 md:ml-0 ml-4">
                  <FaSignInAlt />
                </span>
                <span className="ml-2 lg:block md:hidden text-base tracking-wide truncate">
                  Sign in
                </span>
              </button>
            </li>
          )}
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
