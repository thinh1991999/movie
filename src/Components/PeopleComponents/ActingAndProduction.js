import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ActingAndProduction({ data }) {
  const { cast, crew } = data;
  const language = useSelector((state) => state.root.language);

  const [castData, setCastData] = useState([]);
  const [crewData, setCrewData] = useState([]);

  const getNewArr = (arr) => {
    const newArrCastData = [];
    arr.forEach((item) => {
      const { release_date, first_air_date } = item;
      let year = "";
      year =
        release_date || release_date === ""
          ? release_date?.substring(0, 4)
          : first_air_date?.substring(0, 4);
      const index = newArrCastData.findIndex((item) => {
        return item.year === year;
      });
      if (index === -1) {
        newArrCastData.push({
          year,
          items: [item],
        });
      } else {
        newArrCastData[index].items.push(item);
      }
    });
    const filterData = newArrCastData.filter((item) => {
      return item.year || item.year === "";
    });
    filterData.sort((a, b) => {
      return b.year * 1 - a.year * 1;
    });
    return filterData;
  };

  useEffect(() => {
    setCastData(getNewArr(cast));
    setCrewData(getNewArr(crew));
  }, []);

  return (
    <div className="w-full mt-20 text-gray-800 dark:text-white">
      <div className="">
        <h5 className="capitalize font-semibold text-xl mb-2">
          {language.peopleActing}
        </h5>
        <div className="border-l-[1px] border-r-[1px] border-t-[1px]">
          {castData.map((item, index) => {
            const { year, items } = item;
            if (!year && year !== "") return;
            return (
              <ul
                key={index}
                className="px-4 py-5 bg-slate-100 card-shadow dark:bg-slate-900  border-b-[1px]"
              >
                {items.map((castItem, index) => {
                  const { title, character, name, id, media_type } = castItem;
                  return (
                    <li className="flex mb-3" key={`${id}${index}`}>
                      <span className="block w-[50px] text-center">
                        {year || "—"}
                      </span>
                      <p className="ml-5 flex-1 ">
                        <Link
                          to={`/detail/${id}/${media_type}`}
                          className="text-md font-semibold cursor-pointer hover:text-blue-600 transition-all duration-300 ease-linear"
                        >
                          {title || name}{" "}
                        </Link>
                        {character && (
                          <span className="text-sm text-gray-400">
                            as {character}
                          </span>
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>
      {crewData.length > 0 && (
        <div className="mt-10">
          <h5 className="capitalize font-semibold text-xl mb-2">
            {language.peopleProduction}
          </h5>
          <div className="border-l-[1px] border-r-[1px] border-t-[1px]">
            {crewData.map((item, index) => {
              const { year, items } = item;
              if (!year && year !== "") return;
              return (
                <ul
                  key={index}
                  className="px-4 py-5 bg-slate-100 card-shadow dark:bg-slate-900  border-b-[1px]"
                >
                  {items.map((castItem, index) => {
                    const { title, job, name, id } = castItem;
                    return (
                      <li className="flex" key={`${id}${index}`}>
                        <span className="block w-[50px] text-center">
                          {year || "—"}
                        </span>
                        <p className="ml-5 flex-1">
                          {title || name}{" "}
                          {job && (
                            <span className="text-sm text-gray-400">
                              ...{job}
                            </span>
                          )}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActingAndProduction;
