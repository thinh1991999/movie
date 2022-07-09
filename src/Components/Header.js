import Button from "./Button";
import {
  AiFillSetting,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSearch,
  AiOutlineMenu,
} from "react-icons/ai";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Store";
import Setting from "./Setting";
import { useEffect, useRef, useState } from "react";
import Search from "./Search";

function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.root.theme);
  const showNavMobile = useSelector((state) => state.root.showNavMobile);
  const bgHeader = useSelector((state) => state.root.bgHeader);
  const [showSetting, setShowSetting] = useState(false);

  const settingWrapRef = useRef(null);

  const handleChangeTheme = () => {
    if (theme === "") {
      dispatch(actions.setTheme("dark"));
    } else {
      dispatch(actions.setTheme(""));
    }
  };

  const event = (e) => {
    if (!settingWrapRef.current.contains(e.target)) {
      setShowSetting(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", event);
    return () => {
      window.removeEventListener("click", event);
    };
  }, []);

  return (
    <div
      className={`fixed flex justify-between lg:px-8 px-4 top-0  right-0 left-0 lg:left-[calc(100%/6)] md:left-[calc(100%/16)] py-1  bg-white dark:bg-gray-800 ${
        !bgHeader && `bg-transparent dark:bg-transparent`
      } h-auto  z-10`}
    >
      <div className="flex flex-1 items-center justify-start h-14 ">
        <div className="flex items-center cursor-pointer md:hidden">
          {theme === "dark" && bgHeader && (
            <img
              src="/iconWhite.png"
              alt=""
              className="w-10 h-10 object-cover"
            />
          )}
          {theme !== "dark" && bgHeader && (
            <img src="/icon.png" alt="" className="w-10 h-10 object-cover" />
          )}
          {!bgHeader && (
            <img
              src="/iconWhite.png"
              alt=""
              className="w-10 h-10 object-cover"
            />
          )}
          <span className="text-gray-800 text-xl font-bold font-sans hidden sm2:block dark:text-white">
            ChillTime
          </span>
        </div>
        <div className={`hidden md:block ${!bgHeader && `text-white`}`}>
          <button>
            <Button size={"text-2xl"}>
              <AiOutlineArrowLeft />
            </Button>
          </button>
          <button>
            <Button size={"text-2xl"}>
              <AiOutlineArrowRight />
            </Button>
          </button>
        </div>
        <div className={"hidden md:block w-1/2"}>
          <Search />
        </div>
      </div>
      <div
        className={`flex items-center justify-center h-14 ${
          !bgHeader && `text-white`
        }`}
      >
        <button className="md:hidden">
          <Button size={"text-2xl"} bg={true} header={bgHeader}>
            <AiOutlineSearch />
          </Button>
        </button>
        <button className="ml-2" onClick={handleChangeTheme}>
          <Button size={"text-2xl "} bg={true} header={bgHeader}>
            {theme === "" ? <BsFillMoonStarsFill /> : <BsSunFill />}
          </Button>
        </button>
        <div
          ref={settingWrapRef}
          className="ml-2 relative before:absolute  before:block before:contents[*] before:w-[100%] before:h-[10px] before:top-full"
        >
          <button onClick={() => setShowSetting(!showSetting)}>
            <Button size={"text-2xl"} bg={true} header={bgHeader}>
              <AiFillSetting />
            </Button>
          </button>
          {showSetting && (
            <div className="absolute min-w-[200px] top-[calc(100%_+_2px)] right-[50%]">
              <Setting />
            </div>
          )}
        </div>

        <button
          className="ml-2 md:hidden"
          onClick={() => dispatch(actions.setShowNavMobile(!showNavMobile))}
        >
          <Button size={"text-2xl"} bg={true}>
            <AiOutlineMenu />
          </Button>
        </button>
      </div>
    </div>
  );
}

export default Header;
