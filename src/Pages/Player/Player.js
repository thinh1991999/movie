import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actions } from "../../Store";
import { axios, getImageUrl } from "../../Shared";
import { getDetail, getTvSession } from "../../Services";
import { AiFillStar, AiFillTags } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Loading, SquareButton } from "../../Components";

function Player() {
  const navigate = useNavigate();

  const { id, type, session, episode } = useParams();

  const [mount, setMount] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [sessionsData, setSessionsData] = useState([]);
  const [episodeCurrent, setEpisodeCurrent] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [episodeData, setEpisodeData] = useState([]);
  const dispatch = useDispatch();
  console.log(mediaUrl);
  const handleChangeEpisode = (episode_number) => {
    navigate(`/player/${id}/${type}/${session}/${episode_number}`);
  };

  useEffect(() => {
    setDetailData(null);
    // setMediaUrl(null);
    getDetail(id, type).then((res) => {
      setDetailData(res);
      setSessionsData(res?.seasons);
    });
    if (type === "movie") {
      setMediaUrl(`https://www.2embed.ru/embed/tmdb/movie?id=${id}`);
    }
  }, [id, type]);
  console.log(type);
  useEffect(() => {
    if (session && episode)
      getTvSession(id, session).then((res) => {
        setEpisodeData(res?.episodes);
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

  if (!detailData) {
    return (
      <div className="">
        <h2>Loading</h2>
      </div>
    );
  }
  console.log(mediaUrl);
  const {
    name,
    title,
    vote_average: score,
    first_air_date: time,
    genres,
    overview,
    backdrop_path: bgShow,
  } = detailData;
  console.log(mediaUrl);
  return (
    <div className="h-screen pt-16 pb-20 px-5 w-full overflow-y-scroll scroll-list">
      <div className="flex  ">
        <div className="w-full ">
          <div className="mb-5 h-[500px] bg-gray-400/[0.2] dark:bg-gray-900">
            {mediaUrl ? (
              <iframe
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
            )}
          </div>
          {episodeData.length > 0 && (
            <div className="mb-4">
              <h4 className="text-gray-800 dark:text-white mb-2">Episodes</h4>
              <div className="">
                {episodeData.map((item, index) => {
                  const { episode_number } = item;
                  return (
                    <button
                      className={`${
                        episodeCurrent * 1 === episode_number
                          ? "bg-blue-600"
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
          </h3>
          <div className="flex text-xl items-center mt-2 text-gray-800 dark:text-white">
            <AiFillStar className="text-yellow-300" />
            <span className="ml-1 text-base">{score}</span>
            <img src="/calendar.png" alt="" className="lg:h-5 ml-4" />
            <span className="ml-1 text-base">{time}</span>
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
          <p className="mt-2 text-gray-800 dark:text-white text-base">
            {overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Player;
