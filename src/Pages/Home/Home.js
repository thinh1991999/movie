import React, { useEffect, useState } from "react";
import { axios } from "../../Shared";
import {
  AlbumSlider,
  BannerSlider,
  TopSearch,
  Trending,
} from "../../Components";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getNowPlaying,
  getPopular,
  getTodayTrending,
  getTopRated,
  getWeekTrending,
  getTvAiringToday,
  getTvOnTheAir,
} from "../../Services";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";
import { getupcoming } from "../../Services/explore";

function Home() {
  const dispatch = useDispatch();

  const trending = useSelector((state) => state.home.trending);
  const popular = useSelector((state) => state.home.popular);
  const topRated = useSelector((state) => state.home.topRated);

  const [trendingData, setTrendingData] = useState(null);
  const [popularData, setPopularData] = useState(null);
  const [topRatedData, setTopRatedData] = useState(null);
  const [homeData, setHomeData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const chooseTrending = (type) => {};

  useEffect(() => {
    setTrendingData(null);
    if (trending === "week") {
      getWeekTrending()
        .then((res) => {
          setTrendingData(res);
        })
        .catch(() => {
          setTrendingData(null);
        });
    } else {
      getTodayTrending()
        .then((res) => {
          setTrendingData(res);
        })
        .catch(() => {
          setTrendingData(null);
        });
    }
  }, [trending]);

  // useEffect(() => {
  //   dispatch(actions.setBgHeader(true));
  //   Promise.all([
  //     getPopular(popular, 1),
  //     getTopRated(topRated, 1),
  //     getNowPlaying("", 1),
  //     getupcoming("", 1),
  //     getTvAiringToday("", 1),
  //     getTvOnTheAir("", 1),
  //   ]).then((res) => setHomeData(res));
  // }, [popular, topRated]);

  useEffect(() => {
    console.log("abc");
    setPopularData(null);
    getPopular(popular, 1).then((res) => {
      setPopularData(res);
    });
  }, [popular]);

  useEffect(() => {
    setTopRatedData(null);
    getTopRated(topRated, 1).then((res) => {
      setTopRatedData(res);
    });
  }, [topRated]);

  useEffect(() => {
    Promise.all([
      getNowPlaying("", 1),
      getupcoming("", 1),
      getTvAiringToday("", 1),
      getTvOnTheAir("", 1),
    ]).then((res) => setHomeData(res));
    dispatch(actions.setBgHeader(true));
  }, []);

  return (
    <div className="h-screen w-full pt-16 overflow-auto scroll-list">
      <div className="md:w-3/4 w-full px-5 py-5 ">
        <BannerSlider data={trendingData} />
        <div className="w-full">
          <AlbumSlider data={popularData} option={true} />
          <AlbumSlider data={topRatedData} option={true} />
          {homeData.map((item, index) => {
            const { mode } = item;
            if (mode) {
              return <AlbumSlider data={item} key={index} option={true} />;
            } else {
              return <AlbumSlider data={item} key={index} option={false} />;
            }
          })}
        </div>
      </div>
      <Trending data={trendingData} />
    </div>
  );
}

export default Home;
