import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";
import _ from "lodash";
import { BsChevronDown } from "react-icons/bs";

function SelectConfig({ data }) {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.explore.search);
  const mainRef = useRef(null);
  const [showDrop, setShowDrop] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  const handleSetSearch = (id) => {
    const { type } = data;
    setShowDrop(!showDrop);
    dispatch(
      actions.setSearchExplore({
        ...search,
        [type]: id,
      })
    );
  };

  useEffect(() => {
    if (data) {
      const { type, options } = data;
      const index = _.findIndex(options, ["id", search[type]]);
      setCurrentValue(options[index].name);
    }
  }, [search, data]);

  const event = (e) => {
    !mainRef.current.contains(e.target) && setShowDrop(false);
  };

  useEffect(() => {
    showDrop && window.addEventListener("click", event);
    return () => {
      window.removeEventListener("click", event);
    };
  }, [showDrop]);

  if (!data) {
    return (
      <div className="bg-gray-200 min-w-[180px] dark:bg-gray-600 mr-2 h-8  rounded-md"></div>
    );
  }
  const { type, options } = data;

  return (
    <div className="bg-gray-200 min-w-[180px] dark:bg-gray-600 mr-2   rounded-md mt-2">
      <div className="relative  text-gray-800 dark:text-white capitalize ">
        <div
          className="py-1 px-2 flex items-center justify-between cursor-pointer"
          onClick={() => setShowDrop(!showDrop)}
          ref={mainRef}
        >
          <p className="mr-2">{currentValue}</p>
          <div className="flex items-center justify-center text-sm">
            <BsChevronDown />
          </div>
        </div>
        {showDrop && (
          <ul className="max-h-[300px] pb-0 overflow-y-scroll absolute top-[100%] left-0 w-full z-30 scroll-list bg-gray-200 dark:bg-gray-600">
            {options?.map((item) => {
              const { name, id } = item;
              if (!name || name.includes("?") || id === "xx") return;
              return (
                <li
                  key={id}
                  value={id}
                  className={`text-gray-800 ${
                    search[type] === id && `bg-blue-500`
                  } hover:bg-blue-500 py-1 px-2 dark:text-white w-full capitalize sub-title w-full cursor-pointer`}
                  onClick={() => handleSetSearch(id)}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default memo(SelectConfig);
