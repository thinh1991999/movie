import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Store";
import { AiOutlineRight } from "react-icons/ai";

function Setting() {
  const language = useSelector((state) => state.root.language);
  const dispatch = useDispatch();

  const [flag, setFlag] = useState([
    {
      name: "Việt Nam",
      type: "VN",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/my-project-2b635.appspot.com/o/1024px-Flag_of_Vietnam.svg.png?alt=media&token=299e8526-fc69-4446-b26a-500e22728b7c",
    },
    {
      name: "America",
      type: "US",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/my-project-2b635.appspot.com/o/ameraica.png?alt=media&token=91b96932-d6dd-4369-9289-6c6cc7089a24",
    },
  ]);

  const handleChangeLanguage = (type) => {
    dispatch(actions.setLanguage(type));
  };

  return (
    <div className="w-full rounded-md  text-gray-800 dark:text-white bg-slate-400 py-2  cursor-default">
      <ul>
        <li className="group-bar flex items-center relative capitalize justify-between cursor-pointer px-5 py-2 hover:bg-slate-500 transition-all duration-300 ease-linear">
          {language.headerLanguage}:
          <img
            src={flag.filter((item) => item.type === language.hint)[0].imgUrl}
            alt=""
            className="w-[30px] object-contain"
          />
          <AiOutlineRight />
          <div className="absolute group-bar-hover:block setting-shadow hidden w-[150px] right-[100%] rounded-md translate-y-1/2 bottom-0 py-2 bg-slate-400">
            <ul>
              {flag.map((item, index) => {
                return (
                  <li
                    onClick={() => handleChangeLanguage(item.type)}
                    className="flex justify-between py-2 px-4 hover:bg-slate-500 transition-all duration-300 ease-linear"
                    key={index}
                  >
                    <span>{item.name}</span>
                    <div className="w-[30px]">
                      <img
                        src={item.imgUrl}
                        alt=""
                        className="w-full object-cover "
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Setting;
