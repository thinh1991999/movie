import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";

function ChooseRate({ title, number, begin, end, hint, twoWay }) {
  const search = useSelector((state) => state.explore.search);
  const reset = useSelector((state) => state.explore.reset);

  const dispatch = useDispatch();
  const [result, setResult] = useState("");
  const [countHint, setCountHint] = useState(Math.floor(number / hint));
  const [mouseLeftDown, setMouseLeftDown] = useState(false);
  const [mouseRightDown, setMouseRightDown] = useState(false);
  const [levelLeft, setLevelLeft] = useState(0);
  const [levelRight, setLevelRight] = useState(0);
  const [leftIndex, setLeftIndex] = useState(false);
  const [arrChar, setArrChar] = useState([]);

  const charRef = useRef(null);

  const handleLeftBtnDown = () => {
    setMouseLeftDown(true);
  };

  const handleRightBtnDown = () => {
    setMouseRightDown(true);
  };

  const handleLeftBtnUp = () => {};

  const eventLeft = () => {
    setMouseLeftDown(false);
  };

  const eventRight = () => {
    setMouseRightDown(false);
  };

  const eventMoveLeftBtn = (e) => {
    const { width, x } = charRef.current.getBoundingClientRect();
    if (e.clientX <= x) {
      setLevelLeft(0);
    } else if (e.clientX >= x + width) {
      setLevelLeft(10);
    } else {
      const hintRange = e.clientX - x;
      const calIndex = Math.round((hintRange / width) * 10);
      10 - calIndex === levelRight && setLeftIndex(true);
      10 - calIndex < levelRight && setLevelRight(10 - calIndex);
      setLevelLeft(calIndex);
    }
  };

  const eventMoveRightBtn = (e) => {
    const { width, x } = charRef.current.getBoundingClientRect();
    if (e.clientX <= x) {
      setLevelRight(10);
    } else if (e.clientX >= x + width) {
      setLevelRight(0);
    } else {
      const hintRange = e.clientX - x;
      const calIndex = Math.round((hintRange / width) * 10);
      calIndex === levelLeft && setLeftIndex(false);
      calIndex < levelLeft && setLevelLeft(calIndex);
      setLevelRight(10 - calIndex);
    }
  };
  useEffect(() => {
    if (mouseLeftDown) {
      window.addEventListener("mouseup", eventLeft);
      window.addEventListener("mousemove", eventMoveLeftBtn);
    }
    if (mouseRightDown) {
      window.addEventListener("mouseup", eventRight);
      window.addEventListener("mousemove", eventMoveRightBtn);
    }
    return () => {
      window.removeEventListener("mouseup", eventLeft);
      window.removeEventListener("mousemove", eventMoveLeftBtn);
      window.removeEventListener("mouseup", eventRight);
      window.removeEventListener("mousemove", eventMoveRightBtn);
    };
  }, [mouseLeftDown, mouseRightDown]);

  useEffect(() => {
    if (!reset) {
      if (twoWay) {
        if (levelLeft === 10 - levelRight) {
          const calNumber = (number / 10) * levelLeft;
          setResult(`${calNumber}`);
          dispatch(
            actions.setSearchExplore({
              ...search,
              [begin]: calNumber,
              [end]: calNumber,
            })
          );
        } else {
          const calLeftNb = (number / 10) * levelLeft;
          const calRightNb = number * ((10 - levelRight) / 10);
          dispatch(
            actions.setSearchExplore({
              ...search,
              [begin]: calLeftNb,
              [end]: calRightNb,
            })
          );
          setResult(`${calLeftNb}-${calRightNb}`);
        }
      } else {
        const calNb = (number / 10) * levelLeft;
        dispatch(
          actions.setSearchExplore({
            ...search,
            [begin]: calNb,
          })
        );
        setResult(`${calNb}`);
      }
    }
  }, [levelLeft, levelRight, twoWay, reset]);
  useEffect(() => {
    const arr = Array.from({ length: 11 }, (_, i) => i * (number / 10));
    setArrChar(arr);
  }, [countHint]);

  useEffect(() => {
    if (reset) {
      setLevelLeft((search[begin] / number) * 10);
      end && setLevelRight(number * ((10 - search[end]) / 10));
      dispatch(actions.setResetExplore(false));
    }
  }, [reset, search]);

  return (
    <div className="w-[200px] mx-4">
      <h2 className="text-gray-800 capitalize dark:text-white text-sm">
        {title}: <span>{result}</span>
      </h2>
      <div className="w-full">
        <div className="w-full">
          <ul className="flex justify-between items-end text-gray-700 dark:text-gray-400">
            {arrChar.map((item, index) => {
              if (item % countHint === 0) {
                return (
                  <li
                    key={index}
                    className="block w-[1px] h-2 bg-gray-700 dark:bg-white  relative "
                  >
                    <span className="absolute top-4 text-xs -translate-x-1/2">
                      {item}
                    </span>
                  </li>
                );
              }
              return (
                <li
                  key={index}
                  className="block w-[1px] h-1 bg-gray-700 dark:bg-white "
                ></li>
              );
            })}
          </ul>
          <div
            className={`relative w-full h-[6px] ${
              twoWay ? `bg-blue-500` : `bg-gray-200`
            } mt-1`}
            ref={charRef}
          >
            <div
              className={`absolute h-full  top-0 left-0 ${
                twoWay ? `bg-gray-200` : `bg-blue-500`
              }`}
              style={{
                width: `${levelLeft}0%`,
              }}
            ></div>
            <div
              className="absolute h-full top-0 right-0 bg-gray-200"
              style={{
                width: `${levelRight}0%`,
              }}
            ></div>
            <button
              onMouseDown={handleLeftBtnDown}
              onMouseUp={handleLeftBtnUp}
              className={`w-4 h-4 hover:scale-125 rounded-full bg-blue-500 absolute  top-1/2 -translate-y-1/2`}
              style={{
                left: `${-8 + (200 / 10) * levelLeft}px`,
                zIndex: `${leftIndex ? `3` : ``}`,
              }}
            ></button>
            {twoWay && (
              <button
                onMouseDown={handleRightBtnDown}
                className="w-4 h-4 hover:scale-125 rounded-full bg-blue-500 absolute  top-1/2 -translate-y-1/2"
                style={{
                  right: `${-8 + (200 / 10) * levelRight}px`,
                  zIndex: `2`,
                }}
              ></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ChooseRate);
