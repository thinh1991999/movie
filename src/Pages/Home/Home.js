import React, { useEffect, useState } from "react";
import { AlbumSlider, BannerSlider, Trending } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";
import httpService from "../../Services/http.service";

function Home() {
  const dispatch = useDispatch();
  const trending = useSelector((state) => state.home.trending);
  const popular = useSelector((state) => state.home.popular);
  const topRated = useSelector((state) => state.home.topRated);
  const language = useSelector((state) => state.root.language);

  const [trendingData, setTrendingData] = useState(null);
  const [popularData, setPopularData] = useState(null);
  const [topRatedData, setTopRatedData] = useState(null);
  const [homeData, setHomeData] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTrendingData(null);
    if (trending === "week") {
      httpService.getWeekTrending().then((res) => {
        setTrendingData(res.data);
      });
    } else {
      httpService.getTodayTrending().then((res) => {
        setTrendingData(res.data);
      });
    }
  }, [trending]);

  useEffect(() => {
    setPopularData(null);
    httpService.getPopular(popular, 1).then((res) => {
      setPopularData({
        data: res?.data,
        title: language.homePopular,
        mode: "popular",
        type: popular,
      });
    });
  }, [popular]);

  useEffect(() => {
    setTopRatedData(null);
    httpService.getTopRated(topRated, 1).then((res) => {
      setTopRatedData({
        data: res?.data,
        title: language.homeTopRated,
        mode: "topRated",
        type: topRated,
      });
    });
  }, [topRated]);

  useEffect(() => {
    const call1 = httpService.getMovieNowPlaying(1).then((res) => {
      return {
        ...res,
        type: "movie",
        title: language.homeNowPlaying,
        hint: "homeNowPlaying",
      };
    });
    const call2 = httpService.getMovieUpComing(1).then((res) => {
      return {
        ...res,
        type: "movie",
        title: language.homeUpComing,
        hint: "homeUpComing",
      };
    });
    const call3 = httpService.getTvAiringToday(1).then((res) => {
      return {
        ...res,
        type: "tv",
        title: language.homeTvShows,
        hint: "homeTvShows",
      };
    });
    const call4 = httpService.getTvOnTheAir(1).then((res) => {
      return {
        ...res,
        type: "tv",
        title: language.homeCurrentlyTv,
        hint: "homeCurrentlyTv",
      };
    });

    Promise.all([call1, call2, call3, call4]).then((res) => {
      setHomeData(res);
    });
    dispatch(actions.setBgHeader(true));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setPopularData({
        ...popularData,
        title: language.homePopular,
      });
      setTopRatedData({
        ...topRatedData,
        title: language.homeTopRated,
      });
      homeData.forEach((item) => {
        item.title = language[item.hint];
      });
    }
    document.title = language.home;
  }, [language]);

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
