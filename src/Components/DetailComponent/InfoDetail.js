import { useState } from "react";
import { AiFillStar, AiFillTags } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SquareButton, Modal } from "..";
import { getTimeMovie } from "../../Shared";
import { IoEyeSharp } from "react-icons/io5";
import { actions } from "../../Store";
import DetailModal from "./DetailModal";

function InfoDetail({ data, type }) {
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

  const handleShowTrailer = () => {};

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
            <Link to={`/explored/${id}`} key={id} className="mr-2">
              <SquareButton msg={name} bd={false} detail={true} />
            </Link>
          );
        })}
      </div>
      <div className="mt-5">
        <Link to={`/`} className="inline-block">
          <SquareButton msg={"watch"} bg={"bg-red-700/[0.8]"} bd={true} />
        </Link>
        <a
          href="#trailer"
          className="inline-block ml-4"
          onClick={handleShowTrailer}
        >
          <SquareButton msg={"trailer"} bg={"bg-blue-700/[0.8]"} bd={true} />
        </a>
      </div>
      <div className="mt-2 text-base text-center px-5 md:px-0 md:text-left capitalize">
        {nations.length > 0 && (
          <p className="">
            <span className="text-sm">nation</span>:{" "}
            {nations.map((item, index) => {
              const { iso_3166_1, name } = item;
              return <span key={index}>{name}</span>;
            })}
          </p>
        )}

        {episodeCount && (
          <p>
            <span className="text-sm">episodes:</span> {episodeCount}{" "}
            <span>eps</span>
          </p>
        )}
        {seriesNo && (
          <p>
            <span className="text-sm">seasons:</span> {seriesNo}
          </p>
        )}
        {runtime && (
          <p>
            <span className="text-sm">duration:</span> {getTimeMovie(runtime)}
          </p>
        )}

        <p className="">
          <span className="text-sm">overview:</span>{" "}
          {overview.length > 150 ? (
            <span className="">
              {`${overview.substring(0, 150)}...`}{" "}
              <button
                className="uppercase font-bold hover:text-blue-600 transition-all duration-300 ease-linear"
                onClick={() => setShowDetailModal(true)}
              >
                read More
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
