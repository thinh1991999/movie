import { useCallback, useEffect, useState } from "react";
import { SelectConfig, AlbumSlider, SquareButton } from "../../Components";
import InfiniteScroll from "react-infinite-scroll-component";
import { axios } from "../../Shared";
import Card from "../../Components/Card";
import { useParams } from "react-router-dom";

function Explored() {
  const { category } = useParams();

  const [dataFound, setDataFound] = useState([]);
  const [navIndex, setNavIndex] = useState(0);
  const [selectConfig, setSelectConfig] = useState([]);
  const [advancedSearch, setAdvancedSearch] = useState({
    params: "",
    area: "",
    category: category || "",
    year: "",
    subtitles: "",
    order: "up",
  });

  const [size, setSize] = useState(20);
  const [hasMore, setHasMore] = useState(true);

  const handleSetSearch = useCallback(
    (type, value) => {
      setAdvancedSearch({
        ...advancedSearch,
        [type]: value,
      });
    },
    [advancedSearch]
  );

  const handleLoadMore = () => {
    setSize(size + 10);
  };

  const handleChangeNav = (index) => {
    setNavIndex(index);
    setDataFound([]);
    setSize(20);
  };

  const handleClearSearch = () => {
    setAdvancedSearch({
      ...advancedSearch,
      area: "",
      category: "",
      year: "",
      subtitles: "",
      order: "up",
    });
  };

  const getConfig = async () => {
    await axios.get("search/list", null).then((res) => {
      const { data } = res;
      setSelectConfig(data.data);
    });
  };

  const getAdvancedSearch = async () => {
    setHasMore(true);
    await axios
      .post("search/v1/search", {
        ...advancedSearch,
        size,
      })
      .then((res) => {
        const { data } = res;
        if (data.data.searchResults.length < size) {
          setHasMore(false);
        }
        setDataFound([...data.data.searchResults]);
      });
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getAdvancedSearch();
  }, [size, navIndex, advancedSearch]);

  useEffect(() => {
    if (selectConfig.length > 0) {
      setAdvancedSearch({
        ...advancedSearch,
        params: selectConfig[navIndex].params,
      });
    }
  }, [selectConfig, navIndex]);

  return (
    <div className="w-full h-screen flex flex-col pt-16 dark:bg-gray-800 bg-white px-5 py-5">
      <div className="">
        <div className="w-full mb-8">
          <ul className="flex items-center">
            {selectConfig.map((item, index) => {
              const { name } = item;
              return (
                <li
                  key={index}
                  className={`text-xl text-gray-800 dark:text-white py-1 mr-4 cursor-pointer capitalize  ${
                    index === navIndex
                      ? `text-blue-600 dark:text-blue-600 border-blue-600 border-b-2`
                      : ""
                  } `}
                  onClick={() => handleChangeNav(index)}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center justify-start flex-wrap">
          {selectConfig[navIndex]?.screeningItems?.map((item, index) => {
            let type = "";
            if (index === 0) {
              type = "area";
            } else if (index === 1) {
              type = "category";
            } else if (index === 2) {
              type = "year";
            } else if (index === 3) {
              type = "subtitles";
            } else if (index === 4) {
              type = "order";
            }

            return (
              <SelectConfig
                handleSetSearch={handleSetSearch}
                data={item}
                key={index}
                type={type}
                value={advancedSearch[type]}
              />
            );
          })}
          <button className="mt-2" onClick={handleClearSearch}>
            <SquareButton msg={"Reset"}></SquareButton>
          </button>
        </div>
      </div>
      <div
        id="scrollableDiv"
        className="overflow-auto flex flex-col flex-1 scroll-list mt-4 mark"
      >
        <InfiniteScroll
          dataLength={dataFound.length}
          next={handleLoadMore}
          style={{}}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
          loader={
            <div className="w-full  py-5 overflow-hidden">
              <AlbumSlider full={true} />
            </div>
          }
          className="w-full "
        >
          <div className="flex flex-wrap">
            {dataFound.map((item, index) => {
              const { id } = item;
              return (
                <div
                  key={`${id}${index}`}
                  className="w-full smm3:w-1/2 smm:w-1/3 mdd:w-1/4 lgg:w-1/5 xll:w-1/6 "
                >
                  <Card data={item} />
                </div>
              );
            })}
            {!hasMore && dataFound.length === 0 ? (
              <h2 className="text-gray-800 dark:text-white text-center pt-5 text-2xl w-full block">
                Nothing to see
              </h2>
            ) : (
              ""
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Explored;
