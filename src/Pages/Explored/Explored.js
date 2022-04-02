import { useCallback, useEffect, useState } from "react";
import {
  SelectConfig,
  AlbumSlider,
  SquareButton,
  CircleLoading,
  ChooseRate,
} from "../../Components";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../Components/Card";
import { useParams } from "react-router-dom";
import { getDiscover, getGenres, getLanguages } from "../../Services";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";
import _ from "lodash";

function Explored() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.explore.search);

  const [navData, setNavData] = useState([
    {
      type: "tv",
      name: "TV Series",
    },
    {
      type: "movie",
      name: "movie",
    },
  ]);
  const [dataFound, setDataFound] = useState([]);
  const [navIndex, setNavIndex] = useState(0);
  const [genres, setGenres] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [firstLoading, setFirstLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleSetSearch = useCallback();

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleChangeNav = (index) => {
    setNavIndex(index);
    setDataFound([]);
  };

  const handleClearSearch = () => {
    dispatch(
      actions.setSearchExplore({
        with_genres: "",
        with_original_language: "",
        "vote_average.gte": 0,
        "vote_average.lte": 10,
        "vote_count.gte": 0,
      })
    );
    dispatch(actions.setResetExplore(true));
  };

  useEffect(async () => {
    dispatch(
      actions.setSearchExplore({
        ...search,
        with_genres: "",
      })
    );
    setGenres(null);
    await getGenres(navData[navIndex].type).then((res) => {
      setGenres({
        type: "with_genres",
        options: [
          {
            id: "",
            name: "all genres",
          },
          ...res.genres,
        ],
      });
    });
  }, [navIndex]);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (page > 1) {
        const type = navData[navIndex].type;
        getDiscover(type, search, page).then((res) => {
          res.total_pages === 1 || res.results.length === 0
            ? setHasMore(false)
            : setHasMore(true);
          setDataFound([...dataFound, ...res.results]);
        });
      }
    }, 500);
    return () => {
      clearTimeout(getData);
    };
  }, [page]);

  useEffect(() => {
    dispatch(actions.setBgHeader(true));
    getLanguages().then((res) => {
      const newArr = res.map((item) => {
        const { iso_639_1, english_name } = item;
        return {
          id: iso_639_1,
          name: english_name,
        };
      });
      const newArrSorted = _.sortBy(newArr, [
        function (o) {
          return o.name;
        },
      ]);
      setLanguages({
        type: "with_original_language",
        options: [
          {
            id: "",
            name: "all Languages",
          },
          ...newArrSorted,
        ],
      });
    });
    return () => {
      dispatch(actions.setResetExplore(true));
    };
  }, []);

  useEffect(() => {
    setFirstLoading(true);
    setPage(1);
    const getData = setTimeout(() => {
      const type = navData[navIndex].type;
      getDiscover(type, search, 1).then((res) => {
        res.total_pages === 1 || res.results.length === 0
          ? setHasMore(false)
          : setHasMore(true);
        setDataFound(res.results);
        setFirstLoading(false);
      });
    }, 500);
    return () => {
      clearTimeout(getData);
    };
  }, [search]);

  return (
    <div className="w-full h-screen overflow-x-hidden flex flex-col pt-16 dark:bg-gray-800 bg-white px-5 py-5">
      <div className="">
        <div className="w-full mb-8">
          <ul className="flex items-center">
            {navData.map((item, index) => {
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
          <SelectConfig data={genres} handleSetSearch={handleSetSearch} />
          <SelectConfig data={languages} handleSetSearch={handleSetSearch} />
          <ChooseRate
            title={"Score"}
            begin={"vote_average.gte"}
            end={"vote_average.lte"}
            number={10}
            hint={2}
            twoWay={true}
          />
          <ChooseRate
            title={"minimum voted"}
            begin={"vote_count.gte"}
            number={500}
            hint={5}
          />
          <button className="mt-2" onClick={handleClearSearch}>
            <SquareButton msg={"Reset"}></SquareButton>
          </button>
        </div>
      </div>
      <div
        id="scrollableDiv"
        className="overflow-auto flex flex-col flex-1 scroll-list mt-4 mark"
      >
        {firstLoading ? (
          <div className="w-full  py-5 overflow-hidden">
            <AlbumSlider full={true} />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={dataFound.length}
            next={handleLoadMore}
            style={{}}
            hasMore={hasMore}
            scrollableTarget="scrollableDiv"
            loader={
              <div className="w-full  py-5 overflow-hidden flex justify-center">
                <CircleLoading />
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
                    <Card data={item} typeNavigate={navData[navIndex].type} />
                  </div>
                );
              })}
            </div>
            {!hasMore && dataFound.length === 0 ? (
              <h2 className="text-gray-800 dark:text-white text-center pt-5 text-2xl w-full block">
                Nothing to see
              </h2>
            ) : (
              ""
            )}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default Explored;