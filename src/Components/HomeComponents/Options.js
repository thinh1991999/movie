import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";

function Options({ mode, options }) {
  const modeCurrent = useSelector((state) => state.home[mode]);
  const dispatch = useDispatch();
  const handleOptions = (value) => {
    dispatch(
      actions.setOptions({
        mode,
        value,
      })
    );
  };

  return (
    <div className="flex justify-center">
      <ul className="inline-flex p-1 bg-gray-300 items-center rounded-full overflow-hidden dark:bg-gray-500/[0.3] text-gray-800 dark:text-white">
        {options.map((item, index) => {
          return (
            <li
              key={index}
              className={`px-3 py-1 rounded-full opacity-50 capitalize ${
                item === modeCurrent &&
                `bg-gray-200 dark:bg-gray-600/[0.8] opacity-100`
              } cursor-pointer`}
              onClick={() => handleOptions(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Options;
