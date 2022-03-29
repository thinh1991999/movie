import { memo } from "react";

function SelectConfig({ data, handleSetSearch, type, value }) {
  const { items } = data;
  return (
    <div className="bg-gray-200 dark:bg-gray-600 mr-2 overflow-hidden  rounded-md mt-2">
      <select
        name=""
        id=""
        value={value}
        onChange={(e) => handleSetSearch(type, e.target.value)}
        className="bg-gray-200 dark:bg-gray-600 overflow-hidden  px-2 py-1  text-gray-800 dark:text-white"
      >
        {items.map((item, index) => {
          const { name, params } = item;
          return (
            <option
              key={index}
              value={params}
              className="text-gray-800 dark:text-white w-full cursor-pointer"
            >
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default memo(SelectConfig);
