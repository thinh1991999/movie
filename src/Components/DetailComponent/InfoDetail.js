import { useState } from "react";
import { AiFillStar, AiFillTags } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SquareButton, Modal } from "..";
import { actions } from "../../Store";
import DetailModal from "./DetailModal";

function InfoDetail({ data }) {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const showModal = useSelector((state) => state.root.showModal);
  const dispatch = useDispatch();
  const {
    name,
    score,
    year,
    tagList,
    episodeCount,
    areaNameList,
    seriesNo,
    introduction,
    category,
    id,
  } = data;
  console.log(data);
  const countStar = score / 2;

  return (
    <div className=" text-white text-sm flex justify-center flex-col items-center pb-10 md:block md:pb-0">
      <h2 className="text-3xl px-5 md:px-0 md:text-5xl text-center md:text-left">
        {name}
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
        <span className="ml-1 ">{year}</span>
      </div>
      <div className="mt-5 flex items-center">
        <AiFillTags className="mr-2 text-xl text-yellow-400" />
        {tagList.map((item) => {
          const { name, id } = item;
          return (
            <Link to={`/explored/${id}`} key={id} className="mr-2">
              <SquareButton msg={name} bd={false} detail={true} />
            </Link>
          );
        })}
      </div>
      <div className="mt-5">
        <Link to={`/player/${id}/${category}`} className="inline-block">
          <SquareButton msg={"xem phim"} bg={"bg-red-700/[0.8]"} bd={true} />
        </Link>
      </div>
      <div className="mt-2 text-base text-center px-5 md:px-0 md:text-left capitalize">
        <p className="">
          nation:{" "}
          {areaNameList.map((item, index) => {
            return <span key={index}>{item}</span>;
          })}
        </p>
        {episodeCount && <p>episodes: {episodeCount} eps</p>}
        {seriesNo && <p>seriesNo: {seriesNo}</p>}
        <p>
          introduction:{" "}
          {introduction.length > 150 ? (
            <span className="">
              {`${introduction.substring(0, 150)}...`}{" "}
              <button
                className="uppercase font-bold hover:text-blue-600 transition-all duration-300 ease-linear"
                onClick={() => setShowDetailModal(true)}
              >
                read More
              </button>
            </span>
          ) : (
            introduction
          )}
        </p>
        {showDetailModal && (
          <DetailModal setShowDetailModal={setShowDetailModal}>
            <div className="">
              <h2 className="text-xl mb-5">{name}</h2>
              <p className="max-h-[200px] block overflow-y-auto scroll-list-modal">
                {introduction}
              </p>
            </div>
          </DetailModal>
        )}
      </div>
    </div>
  );
}

export default InfoDetail;
