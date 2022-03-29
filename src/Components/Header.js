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

function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.root.theme);
  const showNavMobile = useSelector((state) => state.root.showNavMobile);
  const bgHeader = useSelector((state) => state.root.bgHeader);

  const handleChangeTheme = () => {
    if (theme === "") {
      dispatch(actions.setTheme("dark"));
    } else {
      dispatch(actions.setTheme(""));
    }
  };

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
        <div
          className={`bg-gray-200 dark:bg-gray-600 ${
            !bgHeader && `bg-gray-200/[0.3] dark:bg-gray-200/[0.3]`
          } px-2 ml-4 rounded-3xl hidden md:flex w-1/2  items-center`}
        >
          <button className={`${!bgHeader && `text-white`}`}>
            <Button size={"text-2xl"}>
              <AiOutlineSearch />
            </Button>
          </button>
          <input
            type="text"
            className={`px-2 flex-1  outline-none  ${
              !bgHeader
                ? `bg-transparent dark:bg-transparent text-white dark:text-white`
                : `bg-gray-200 dark:bg-gray-600 dark:text-gray-200`
            }`}
            placeholder="Search"
          />
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
        <button className="ml-2">
          <Button size={"text-2xl"} bg={true}>
            <AiFillSetting />
          </Button>
        </button>
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
