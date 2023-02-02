import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import httpService from "../../Services/http.service";
import Card from "../Card";
import CircleLoading from "../CircleLoading/CircleLoading";
import LoadingCard from "../LoadingCard";

const MovieList = () => {
  const search = useSelector((state) => state.explore.search);
  const type = useSelector((state) => state.explore.type);
  const language = useSelector((state) => state.root.language);

  const [dataFound, setDataFound] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [page, setPage] = useState(1);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    let isApiSucri = true;
    setFirstLoading(true);
    setPage(1);
    const getData = setTimeout(() => {
      httpService.getDiscover(type, search, 1).then((res) => {
        if (isApiSucri) {
          res?.data.total_pages === 1 || res?.data.results.length === 0
            ? setHasMore(false)
            : setHasMore(true);
          setDataFound(res?.data.results);
          setFirstLoading(false);
        }
      });
    }, 500);
    return () => {
      clearTimeout(getData);
      isApiSucri = false;
    };
  }, [search, type]);

  useEffect(() => {
    let isApiScri = true;
    const getData = setTimeout(() => {
      if (page > 1) {
        httpService.getDiscover(type, search, page).then((res) => {
          if (isApiScri) {
            res.data.total_pages === 1 || res.data.results.length === 0
              ? setHasMore(false)
              : setHasMore(true);
            setDataFound((prev) => {
              return [...prev, ...res.data.results];
            });
          }
        });
      }
    }, 500);
    return () => {
      clearTimeout(getData);
      isApiScri = false;
    };
  }, [page, type, search]);

  return (
    <div
      id="scrollableDiv"
      className="overflow-auto flex flex-col h-[500px] md:h-[unset] md:flex-1 scroll-list mt-4 mark"
    >
      {firstLoading ? (
        <div className="w-full  py-5 overflow-hidden">
          <LoadingCard />
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
                  <Card data={item} typeNavigate={type} />
                </div>
              );
            })}
          </div>
          {!hasMore && dataFound.length === 0 ? (
            <h2 className="text-gray-800 dark:text-white text-center pt-5 text-2xl w-full block">
              {language.nothingToSee}
            </h2>
          ) : (
            <></>
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default MovieList;
