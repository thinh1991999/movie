import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actions } from "../../Store";
import { axios, formatter, getImageUrl, getTimeMovie } from "../../Shared";
import { getDetail, getSmilar, getTvSession } from "../../Services";
import { AiFillStar, AiFillTags } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  Comments,
  DetailSlider,
  Loading,
  SquareButton,
} from "../../Components";

function Player() {
  const navigate = useNavigate();
  const language = useSelector((state) => state.root.language);
  const dispatch = useDispatch();

  const { id, type, session, episode } = useParams();

  const iframeRef = useRef(null);
  const [detailData, setDetailData] = useState(null);
  const [sessionsData, setSessionsData] = useState([]);
  const [similarData, setSimilarData] = useState(null);
  const [episodeCurrent, setEpisodeCurrent] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [episodeData, setEpisodeData] = useState([]);
  const [playing, setPlaying] = useState(false);

  const handleChangeEpisode = (episode_number) => {
    navigate(`/player/${id}/${type}/${session}/${episode_number}`);
  };

  const handleLoad = () => {
    console.log("123");
  };

  useEffect(() => {
    setDetailData(null);
    getDetail(id, type).then((res) => {
      setDetailData(res);
      setSessionsData(res?.seasons);
    });
    getSmilar(id, type, 1).then((res) => {
      setSimilarData(res);
    });
    if (type === "movie") {
      setMediaUrl(`https://www.2embed.ru/embed/tmdb/movie?id=${id}`);
    }
  }, [id, type]);

  useEffect(() => {
    if (session && episode)
      getTvSession(id, session).then((res) => {
        setEpisodeData(res);
      });
  }, [session, id]);

  useEffect(() => {
    let timeOutSetMedia;
    if (type === "tv") {
      setMediaUrl("");
      setEpisodeCurrent(episode);
      timeOutSetMedia = setTimeout(() => {
        setMediaUrl(
          `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${session}&e=${episode}`
        );
      }, 50);
    }
    return () => {
      clearTimeout(timeOutSetMedia);
    };
  }, [episode, session, type]);

  useEffect(() => {
    dispatch(actions.setBgHeader(true));
  }, []);

  useEffect(() => {
    // if (playing) {
    //   console.log(iframeRef.current?.getCurrentTime());
    // }
    console.log(iframeRef.current);
  }, [playing]);

  if (!detailData) {
    return (
      <div className="">
        <h2>Loading</h2>
      </div>
    );
  }
  const {
    name,
    title,
    vote_average: score,
    first_air_date: time,
    release_date,
    genres,
    overview,
    backdrop_path: bgShow,
    runtime,
    budget,
  } = detailData;
  const {
    season_number,
    overview: sessionOverview,
    name: sessionName,
    air_date,
  } = episodeData;

  return (
    <div className="h-screen pt-16 pb-20 px-5 w-full overflow-y-scroll scroll-list">
      <div className="">
        <div className="w-full ">
          <div className="mb-5 h-[500px] bg-gray-400/[0.2] dark:bg-gray-900">
            {/* {mediaUrl ? (
              <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src={mediaUrl}
                title={name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="object-cover"
              ></iframe>
            ) : (
              <Loading />
            )} */}
            <iframe
              ref={iframeRef}
              onProgress={() => console.log("123")}
              width="560"
              height="315"
              src="https://www.youtube.com/embed/m7MyIy0MxWA"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          {episodeData?.episodes?.length > 0 && (
            <div className="mb-4">
              <h4 className="text-gray-800 dark:text-white mb-2">Episodes</h4>
              <div className="">
                {episodeData?.episodes.map((item, index) => {
                  const { episode_number } = item;
                  return (
                    <button
                      className={`${
                        episodeCurrent * 1 === episode_number
                          ? "bg-gradient-to-r from-cyan-400 to-blue-400 dark:from-cyan-700 dark:to-blue-700"
                          : `dark:bg-gray-100/[0.2] bg-gray-500/[0.3]`
                      }  mr-5 rounded-md mt-2 w-12 h-10 text-gray-800 dark:text-white `}
                      onClick={() => handleChangeEpisode(episode_number)}
                      key={episode_number}
                    >
                      <span className="block  ">{episode_number}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <h3 className="text-3xl text-gray-800 dark:text-white">
            {name || title}
            {sessionName && <span className="ml-2">{`(${sessionName})`}</span>}
          </h3>
          <div className="flex text-xl items-center mt-2 text-gray-800 dark:text-white">
            <AiFillStar className="text-yellow-300" />
            <span className="ml-1 text-base">{score}</span>
            <img src="/calendar.png" alt="" className="lg:h-5 ml-4" />
            <span className="ml-1 text-base">
              {air_date || time || release_date}
            </span>
          </div>
          <div className="mt-5 flex items-center">
            <AiFillTags className="mr-2 text-xl text-yellow-400" />
            {genres.map((item) => {
              const { name, id } = item;
              return (
                <Link to={`/explored/${id}/${type}`} key={id} className="mr-2">
                  <SquareButton msg={name} bd={false} detail={true} />
                </Link>
              );
            })}
          </div>
          {runtime && (
            <p className="mt-2 text-gray-800 dark:text-white text-base">
              <span className="capitalize font-semibold">
                {language.detailDuration}:
              </span>{" "}
              {getTimeMovie(runtime)}
            </p>
          )}
          {budget > 0 ? (
            <p className="mt-2 text-gray-800 dark:text-white text-base">
              <span className="capitalize font-semibold">
                {language.playerBudget}:
              </span>{" "}
              {formatter.format(budget)}
            </p>
          ) : (
            ""
          )}
          {season_number && (
            <p className="mt-2 text-gray-800 dark:text-white text-base">
              <span className="capitalize font-semibold">
                {language.playerCurrentSession}:
              </span>{" "}
              {season_number}
            </p>
          )}
          <p className="mt-2 text-gray-800 dark:text-white text-base">
            <span className="capitalize font-semibold">
              {language.detailOverview}:
            </span>{" "}
            {sessionOverview || overview}
          </p>
        </div>
        <Comments />
        <div className="">
          {similarData && similarData?.results.length > 0 && (
            <div className="mt-10">
              <DetailSlider
                data={similarData}
                title={language.detailSimilar}
                typeNavigate={type}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Player;
