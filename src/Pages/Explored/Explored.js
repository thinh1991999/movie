import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  SelectConfig,
  AlbumSlider,
  SquareButton,
  CircleLoading,
  ChooseRate,
} from "../../Components";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../Components/Card";
import { actions } from "../../Store";
import httpService from "../../Services/http.service";

function Explored() {
  const { genre, type } = useParams();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.explore.search);
  const language = useSelector((state) => state.root.language);

  const [navData, setNavData] = useState([
    {
      type: "tv",
      name: language.exploreTvTitle,
    },
    {
      type: "movie",
      name: language.exploreMovieTitle,
    },
  ]);
  const [dataFound, setDataFound] = useState([]);
  const getNavIndex = useMemo(() => {
    return navData.findIndex((item) => item.type === type);
  }, [type]);
  const [navIndex, setNavIndex] = useState(
    getNavIndex === -1 ? 0 : getNavIndex
  );

  const [genres, setGenres] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [firstLoading, setFirstLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mount, setMount] = useState(false);

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

  useEffect(() => {
    mount &&
      dispatch(
        actions.setSearchExplore({
          ...search,
          with_genres: "",
        })
      );
    setGenres(null);
    httpService.getGenres(navData[navIndex].type).then((res) => {
      setGenres({
        type: "with_genres",
        options: [
          {
            id: "",
            name: "all genres",
          },
          ...res.data.genres,
        ],
      });
    });
    setMount(true);
  }, [navIndex]);
  useEffect(() => {
    const getData = setTimeout(() => {
      if (page > 1) {
        const type = navData[navIndex].type;
        httpService.getDiscover(type, search, page).then((res) => {
          res.data.total_pages === 1 || res.data.results.length === 0
            ? setHasMore(false)
            : setHasMore(true);
          setDataFound([...dataFound, ...res.data.results]);
        });
      }
    }, 500);
    return () => {
      clearTimeout(getData);
    };
  }, [page]);

  useEffect(() => {
    setNavData([
      {
        type: "tv",
        name: language.exploreTvTitle,
      },
      {
        type: "movie",
        name: language.exploreMovieTitle,
      },
    ]);
    document.title = language.search;
  }, [language]);

  useEffect(() => {
    dispatch(actions.setBgHeader(true));
    httpService.getLanguages().then((res) => {
      const dataRes = res.data;
      const newArr = dataRes.map((item) => {
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
      dispatch(actions.resetExplore());
    };
  }, []);

  useEffect(() => {
    setFirstLoading(true);
    setPage(1);
    const getData = setTimeout(() => {
      const type = navData[navIndex].type;
      httpService.getDiscover(type, search, 1).then((res) => {
        res?.data.total_pages === 1 || res?.data.results.length === 0
          ? setHasMore(false)
          : setHasMore(true);
        setDataFound(res?.data.results);
        setFirstLoading(false);
      });
    }, 500);
    return () => {
      clearTimeout(getData);
    };
  }, [search]);

  useEffect(() => {
    if (genre) {
      dispatch(
        actions.setSearchExplore({
          ...search,
          with_genres: genre * 1,
        })
      );
    }
  }, [genre]);

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
            title={language.exploreScore}
            begin={"vote_average.gte"}
            end={"vote_average.lte"}
            number={10}
            hint={2}
            twoWay={true}
          />
          <ChooseRate
            title={language.exploreMiniVote}
            begin={"vote_count.gte"}
            number={500}
            hint={5}
          />
          <button className="mt-2" onClick={handleClearSearch}>
            <SquareButton
              msg={language.exploreResetBtn}
              bg="bg-red-600"
            ></SquareButton>
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
                {language.nothingToSee}
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
