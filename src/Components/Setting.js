import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineRight } from "react-icons/ai";
import { actions } from "../Store";

function Setting() {
  const language = useSelector((state) => state.root.language);
  const dispatch = useDispatch();

  const flag = useRef([
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
  ]).current;

  const handleChangeLanguage = (type) => {
    dispatch(actions.setLanguage(type));
  };

  return (
    <div className="w-full rounded-md  text-gray-800 dark:text-white from-violet-400 to-fuchsia-400 bg-gradient-to-r dark:from-violet-800 dark:to-fuchsia-800 py-2  cursor-default">
      <ul>
        <li className="group flex items-center relative capitalize justify-between cursor-pointer px-5 py-2 dark:hover:bg-slate-400/[0.4] hover:bg-slate-400/[0.5] transition-all duration-300 ease-linear">
          {language.headerLanguage}:
          <img
            src={flag.filter((item) => item.type === language.hint)[0].imgUrl}
            alt=""
            className="w-[30px] object-contain"
          />
          <AiOutlineRight />
          <div className="bottom-[-100%] md:bottom-0  md:right-[100%] absolute group-hover:block setting-shadow hidden w-[150px]  rounded-md translate-y-1/2  py-2 from-violet-400 to-fuchsia-400 bg-gradient-to-r dark:from-violet-800 dark:to-fuchsia-800">
            <ul>
              {flag.map((item, index) => {
                return (
                  <li
                    onClick={() => handleChangeLanguage(item.type)}
                    className="flex items-center justify-between py-2 px-4 dark:hover:bg-slate-400/[0.4] hover:bg-slate-400/[0.5] transition-all duration-300 ease-linear"
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
