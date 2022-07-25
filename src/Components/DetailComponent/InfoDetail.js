import { useState } from "react";
import { AiFillStar, AiFillTags } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoEyeSharp } from "react-icons/io5";
import { SquareButton } from "..";
import { getTimeMovie } from "../../Shared";
import DetailModal from "./DetailModal";

function InfoDetail({ data, type, trailerLength }) {
  const navigate = useNavigate();
  const language = useSelector((state) => state.root.language);

  const [showDetailModal, setShowDetailModal] = useState(false);

  const {
    id,
    title,
    name,
    vote_average: score,
    release_date: time,
    genres,
    overview,
    runtime,
    popularity,
    production_countries: nations,
    first_air_date: firstTime,
    number_of_episodes: episodeCount,
    number_of_seasons: seriesNo,
  } = data;

  const countStar = score / 2;

  const handleToPlayer = () => {
    switch (type) {
      case "movie":
        {
          navigate(`/player/${id}/${type}`);
        }
        break;
      case "tv":
        {
          navigate(`/player/${id}/${type}/1/1`);
        }
        break;
      default:
        navigate("/");
    }
  };

  const handleCheckDetail = () => {
    console.log(trailerLength);
    if (trailerLength === 0 || !trailerLength) {
      toast.error(language.detailErrorTrailer);
    }
  };

  return (
    <div className=" text-white text-sm flex justify-center flex-col items-center pb-10 md:block md:pb-0">
      <h2 className="text-3xl px-5 md:px-0 md:text-5xl text-center md:text-left">
        {title || name}
      </h2>
      <div className="flex items-center mt-5">
        {[1, 2, 3, 4, 5].map((item) => {
          if (item <= countStar) {
            return (
              <div className="text-xl relative " key={item}>
                <AiFillStar className="text-yellow-300" />
              </div>
            );
          } else {
            const percent = Math.floor((countStar - item) * -100);

            if (percent < 100 && percent !== 0) {
              const resultPercent = 100 - percent;
              return (
                <div className="text-xl relative" key={item}>
                  <AiFillStar className="text-gray-200" />
                  <div
                    className={`absolute top-0 left-0  bottom-0 right-0 overflow-hidden w-[${resultPercent}%]`}
                    style={{
                      width: `${resultPercent}%`,
                    }}
                  >
                    <AiFillStar className="text-yellow-300" />
                  </div>
                </div>
              );
            } else {
              return (
                <div className="text-xl" key={item}>
                  <AiFillStar className="text-gray-200" />
                </div>
              );
            }
          }
        })}
        <span className="ml-1 ">{score}/10</span>
        <img src="/calendar.png" alt="" className="lg:h-5 ml-4" />
        <span className="ml-1 ">{time || firstTime}</span>
      </div>
      <div className="mt-5 flex items-center">
        <IoEyeSharp className="text-yellow-500 dark:text-yellow-400 text-sm " />
        <span className="ml-1 ">{popularity}</span>
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
      <div className="mt-5">
        <button onClick={handleToPlayer} className="inline-block">
          <SquareButton
            msg={language.detailWatch}
            bg={"bg-red-700/[0.8]"}
            bd={true}
          />
        </button>
        <a
          onClick={handleCheckDetail}
          href={"#trailer"}
          className="inline-block ml-4"
        >
          <SquareButton
            msg={language.detailTrailer}
            bg={"bg-blue-700/[0.8]"}
            bd={true}
          />
        </a>
      </div>
      <div className="mt-2 text-base text-center px-5 md:px-0 md:text-left capitalize">
        {nations.length > 0 && (
          <p className="">
            <span className="text-sm">{language.detailNation}</span>:{" "}
            {nations.map((item, index) => {
              return <span key={index}>{item.name}</span>;
            })}
          </p>
        )}

        {episodeCount && (
          <p>
            <span className="text-sm">{language.detailEpisodes}:</span>{" "}
            {episodeCount} <span>{language.detailEps}</span>
          </p>
        )}
        {seriesNo && (
          <p>
            <span className="text-sm">{language.detailSeasons}:</span>{" "}
            {seriesNo}
          </p>
        )}
        {runtime && (
          <p>
            <span className="text-sm">{language.detailDuration}:</span>{" "}
            {getTimeMovie(runtime)}
          </p>
        )}

        <p className="">
          <span className="text-sm">{language.detailOverview}:</span>{" "}
          {overview.length > 150 ? (
            <span className="">
              {`${overview.substring(0, 150)}...`}{" "}
              <button
                className="uppercase font-bold hover:text-blue-600 transition-all duration-300 ease-linear"
                onClick={() => setShowDetailModal(true)}
              >
                {language.detailReadMore}
              </button>
            </span>
          ) : (
            overview
          )}
        </p>
        {showDetailModal && (
          <DetailModal setShowDetailModal={setShowDetailModal}>
            <div className="">
              <h2 className="text-xl mb-5">{title || name}</h2>
              <p className="max-h-[200px] block overflow-y-auto scroll-list-modal">
                {overview}
              </p>
            </div>
          </DetailModal>
        )}
      </div>
    </div>
  );
}

export default InfoDetail;
