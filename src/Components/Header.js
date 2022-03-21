import Button from "./Button";
import {
  AiFillSetting,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Store";

function Header() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.root);
  console.log(theme);

  const handleChangeTheme = () => {
    if (theme === "") {
      dispatch(actions.setTheme("dark"));
    } else {
      dispatch(actions.setTheme(""));
    }
  };

  return (
    <div className="fixed flex justify-between px-8 top-0  right-0 left-64 py-1  bg-white dark:bg-gray-800 h-auto  z-50">
      <div className="flex flex-1 items-center justify-start h-14 ">
        <div>
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
        <div className="bg-gray-200 dark:bg-gray-600 px-2 ml-4 rounded-3xl w-1/2 flex items-center">
          <button>
            <Button size={"text-2xl"}>
              <AiOutlineSearch />
            </Button>
          </button>
          <input
            type="text"
            className="px-2 flex-1  outline-none bg-gray-200 dark:bg-gray-600 dark:text-gray-200"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex items-center justify-center h-14 ">
        <button>
          <Button size={"text-2xl"} bg={true}>
            <AiFillSetting />
          </Button>
        </button>
        <button className="ml-2" onClick={handleChangeTheme}>
          <Button size={"text-2xl"} bg={true}>
            {theme === "" ? <BsFillMoonStarsFill /> : <BsSunFill />}
          </Button>
        </button>
      </div>
    </div>
  );
}

export default Header;
