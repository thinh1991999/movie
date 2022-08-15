import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircleLoading, Loading } from "../../Components";
import Card from "../../Components/Card";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";
import httpService from "../../Services/http.service";

function Search() {
  const { value } = useParams();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);

  const [allData, setAllData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [navData, setNavData] = useState([
    {
      name: language.exploreMovieTitle,
      type: "movie",
    },
    {
      name: language.exploreTvTitle,
      type: "tv",
    },
    {
      name: language.person,
      type: "person",
    },
  ]);

  const [currentNav, setCurrnentNav] = useState(0);

  useEffect(() => {
    setNavData([
      {
        name: language.exploreMovieTitle,
        type: "movie",
      },
      {
        name: language.exploreTvTitle,
        type: "tv",
      },
      {
        name: language.person,
        type: "person",
      },
    ]);
  }, [language]);

  useEffect(() => {
    if (value) {
      setAllData([]);
      setLoading(true);
      setPage(1);
      httpService
        .getDataSearch(value, 1, navData[currentNav]?.type)
        .then((res) => {
          return res.data;
        })
        .then((res) => {
          res?.total_pages === 1 || res?.results.length === 0
            ? setHasMore(false)
            : setHasMore(true);
          setAllData(res?.results);
          setLoading(false);
        });
    } else {
      setHasMore(false);
      setLoading(false);
      setAllData([]);
    }
  }, [value, currentNav]);

  useEffect(() => {
    if (page > 1) {
      httpService
        .getDataSearch(value, page, navData[currentNav]?.type)
        .then((res) => res.data)
        .then((res) => {
          res.total_pages === 1 || res.results.length === 0
            ? setHasMore(false)
            : setHasMore(true);
          setAllData([...allData, ...res?.results]);
        });
    }
  }, [page]);

  useEffect(() => {
    dispatch(actions.setBgHeader(true));
  }, []);

  return (
    <div className="w-full ">
      <div className=" text-gray-800 h-full flex flex-col dark:text-white">
        <div className="flex items-center px-5  border-b-[1px] border-gray-300/[0.2]">
          <h5 className=" text-3xl sm:block hidden font-medium capitalize">
            {language.searchResults}
          </h5>
          <div className="mx-10 h-8 w-[1px] sm:block hidden bg-gray-300/[0.2]"></div>
          <ul className="flex-1 flex items-center md:justify-start justify-center">
            {navData.map((item, index) => {
              const { name } = item;
              return (
                <li
                  key={index}
                  className={`uppercase text-center text-xl py-2 mr-10 cursor-pointer ${
                    currentNav === index && "border-b-[4px] border-blue-600"
                  }`}
                  onClick={() => setCurrnentNav(index)}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full md:w-auto md:justify-start justify-center px-5 mt-5 mb-2 flex items-center">
          <h5 className="text-center capitalize mr-4 text-2xl font-medium ">
            {language.searchKeyWord}:
          </h5>
          <span className="italic text-xl">{value}</span>
        </div>
        {loading && !allData ? (
          <div className="flex-1 overflow-auto scroll-list flex flex-wrap  px-5">
            {[1, 2, 3, 4, 5, 6].map((item) => {
              return (
                <div className="lgg:w-1/6 mdd:w-1/5 smm:w-1/4 smm2:w-1/3 smm3:w-1/2 w-full  p-2 h-[250px] ">
                  <Loading />
                </div>
              );
            })}
          </div>
        ) : (
          <div
            id="scrollableDiv"
            className="flex-1 py-5 px-5 mark overflow-auto scroll-list"
          >
            <InfiniteScroll
              dataLength={allData.length}
              next={() => setPage(page + 1)}
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
                {allData.map((item, index) => {
                  const { id } = item;
                  return (
                    <div
                      key={`${id}${index}`}
                      className="w-full smm3:w-1/2 smm:w-1/3 mdd:w-1/4 lgg:w-1/5 xll:w-1/6 "
                    >
                      <Card
                        data={item}
                        typeNavigate={navData[currentNav].type}
                      />
                    </div>
                  );
                })}
              </div>
              {!hasMore && allData.length === 0 ? (
                <h2 className="text-gray-800 dark:text-white text-center pt-5 text-2xl w-full block">
                  {language.headerNoResult}
                </h2>
              ) : (
                ""
              )}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
