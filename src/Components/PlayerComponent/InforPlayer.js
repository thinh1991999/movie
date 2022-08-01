import { AiFillStar, AiFillTags } from "react-icons/ai";
import { formatter, getTimeMovie } from "../../Shared";
import { SquareButton } from "..";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { memo } from "react";

function InforPlayer({
  data,
  episodeData,
  episodeCurrent,
  sessionCurrent,
  id,
  type,
  session,
}) {
  const language = useSelector((state) => state.root.language);

  const navigate = useNavigate();
  const {
    name,
    title,
    vote_average: score,
    first_air_date: time,
    release_date,
    genres,
    seasons,
    overview,
    runtime,
    budget,
  } = data;
  const {
    overview: sessionOverview,
    name: sessionName,
    air_date,
  } = episodeData;
  const handleChangeEpisode = (episode_number) => {
    navigate(`/player/${id}/${type}/${session}/${episode_number}`);
  };

  const handleChangeSession = (sessionNumber) => {
    navigate(`/player/${id}/${type}/${sessionNumber}/${1}`);
  };

  return (
    <>
      {seasons?.length > 0 && (
        <div className="mb-4">
          <h4 className="capitalize text-gray-800 dark:text-white mb-2">
            sessions
          </h4>
          <div className="">
            {seasons.map((item) => {
              const { id, season_number } = item;
              return (
                <button
                  className={`${
                    season_number === sessionCurrent * 1
                      ? "bg-gradient-to-r from-cyan-400 to-blue-400 dark:from-cyan-700 dark:to-blue-700"
                      : `dark:bg-gray-100/[0.2] bg-gray-500/[0.3]`
                  }  mr-5 rounded-md mt-2 min-w-[40px] min-h-[40px] px-5 text-gray-800 dark:text-white `}
                  onClick={() => handleChangeSession(season_number)}
                  key={id}
                >
                  <span className="block  ">
                    {season_number === 0 ? `Specials` : season_number}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
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
      {sessionName && (
        <p className="mt-2 text-gray-800 dark:text-white text-base">
          <span className="capitalize font-semibold">
            {language.playerCurrentSession}:
          </span>{" "}
          {sessionName}
        </p>
      )}
      <p className="mt-2 text-gray-800 dark:text-white text-base">
        <span className="capitalize font-semibold">
          {language.detailOverview}:
        </span>{" "}
        {sessionOverview || overview}
      </p>
    </>
  );
}

export default memo(InforPlayer);
