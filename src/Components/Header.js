import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
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
import Search from "./Search";
import Logo from "./Logo";
import Button from "./Button";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.root.theme);
  const routerHistory = useSelector((state) => state.root.routerHistory);
  const currentRouter = useSelector((state) => state.root.currentRouter);
  const showNavMobile = useSelector((state) => state.root.showNavMobile);
  const bgHeader = useSelector((state) => state.root.bgHeader);

  const [showSetting, setShowSetting] = useState(false);
  const settingWrapRef = useRef(null);

  const checkIdxRouter = useMemo(() => {
    return routerHistory.findIndex((item) => {
      return item.key === currentRouter;
    });
  }, [routerHistory, currentRouter]);
  const handleChangeTheme = () => {
    if (theme === "") {
      dispatch(actions.setTheme("dark"));
    } else {
      dispatch(actions.setTheme(""));
    }
  };
  const handleBack = () => {
    if (checkIdxRouter > 0) {
      navigate(-1);
    }
  };
  const handleNext = () => {
    if (checkIdxRouter < routerHistory.length - 1) {
      navigate(+1);
    }
  };

  const event = (e) => {
    if (!settingWrapRef.current?.contains(e.target)) {
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
          <Logo bgHeaderActive={true} mobile={true} />
        </div>
        <div className={`hidden md:block ${!bgHeader && `text-white`}`}>
          <button
            onClick={handleBack}
            className={`${
              checkIdxRouter === 0 && "opacity-50 cursor-not-allowed"
            }`}
          >
            <Button size={"text-2xl"} hover={checkIdxRouter !== 0}>
              <AiOutlineArrowLeft />
            </Button>
          </button>
          <button
            onClick={handleNext}
            className={`${
              checkIdxRouter === routerHistory.length - 1 &&
              "opacity-50 cursor-not-allowed"
            }`}
          >
            <Button
              size={"text-2xl"}
              hover={checkIdxRouter !== routerHistory.length - 1}
            >
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
        <button
          onClick={() => dispatch(actions.setShowSearchMobile(true))}
          className="md:hidden"
        >
          <Button size={"text-2xl"} bg={true} header={bgHeader}>
            <AiOutlineSearch />
          </Button>
        </button>
        <button className="ml-2" onClick={handleChangeTheme}>
          <Button size={"text-2xl "} bg={true} header={bgHeader}>
            {theme === "" ? <BsFillMoonStarsFill /> : <BsSunFill />}
          </Button>
        </button>
        <div ref={settingWrapRef} className="ml-2 relative ">
          <button
            className="block"
            onClick={() => setShowSetting(!showSetting)}
          >
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
