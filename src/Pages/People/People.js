import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Media, Overview } from "../../Components";

import { actions } from "../../Store";

function People() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [nav, setNav] = useState([
    {
      title: "Overview",
    },
    {
      title: "Media",
    },
  ]);
  const [currentNav, setCurrentNav] = useState(0);

  useEffect(() => {
    dispatch(actions.setBgHeader(true));
  }, []);

  return (
    <div className="w-full  text-gray-800 dark:text-white">
      <div className="px-5 py-5">
        <ul className="flex justify-center items-center border-b-[1px] border-gray-400">
          {nav.map((itemNav, index) => {
            return (
              <li
                key={index}
                className={`${
                  index === currentNav && "text-blue-600"
                } mx-5 py-3 cursor-pointer text-2xl relative`}
                onClick={() => setCurrentNav(index)}
              >
                {itemNav.title}
                {index === currentNav ? (
                  <span className="absolute left-0 right-0 bottom-[-1px] h-[4px] bg-blue-600 rounded-sm"></span>
                ) : null}
              </li>
            );
          })}
        </ul>
        <div className="mt-5">
          {currentNav === 0 && <Overview id={id} />}
          {currentNav === 1 && <Media id={id} />}
        </div>
      </div>
    </div>
  );
}

export default People;
