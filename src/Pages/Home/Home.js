import React, { useEffect, useState } from "react";
import { axios } from "../../Shared";
import { AlbumSlider, BannerSlider, TopSearch } from "../../Components";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [topSearchs, setTopSearchs] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const getHome = async () => {
    await axios
      .get("homePage/getHome", {
        params: {
          page,
        },
      })
      .then((res) => {
        const { data } = res;
        setHomeData([...homeData, ...data.data.recommendItems]);
        if (data.data.recommendItems.length === 0) {
          setHasMore(false);
        }
      })
      .catch(() => {
        setHomeData([...homeData]);
      });
  };
  const getTopSearch = async () => {
    await axios
      .get("search/v1/searchLeaderboard")
      .then((res) => {
        const { data } = res;
        setTopSearchs(data.data.list);
      })
      .catch(() => {
        setTopSearchs([]);
      });
  };

  useEffect(() => {
    Promise.all([getHome(), getTopSearch()]);
  }, []);

  useEffect(() => {
    getHome();
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={homeData.length}
      next={() => setPage(page + 1)}
      style={{}}
      hasMore={true}
      height={"100vh"}
      loader={
        <div className="md:w-3/4 w-full px-5 py-5 overflow-hidden">
          <AlbumSlider />
        </div>
      }
      className="w-full pt-16"
    >
      <div className="md:w-3/4 w-full px-5 py-5 overflow-hidden">
        {homeData.length > 0 ? (
          homeData.map((item, index) => {
            const {
              homeSectionId,
              homeSectionType,
              recommendContentVOList,
              homeSectionName,
            } = item;
            if (
              homeSectionType === "BANNER" &&
              recommendContentVOList.length > 3
            ) {
              return (
                <BannerSlider
                  data={recommendContentVOList}
                  key={homeSectionId}
                />
              );
            } else if (homeSectionType === "SINGLE_ALBUM") {
              return (
                <AlbumSlider
                  title={homeSectionName}
                  data={recommendContentVOList}
                  key={index}
                />
              );
            }
          })
        ) : (
          <div className="w-full">
            <BannerSlider />
            <AlbumSlider />
            <AlbumSlider />
          </div>
        )}
      </div>
      <TopSearch data={topSearchs} />
    </InfiniteScroll>
  );
}

export default Home;
