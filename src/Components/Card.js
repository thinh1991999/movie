import { LazyLoadImage } from "react-lazy-load-image-component";
import { getImageUrl, IMAGE_CARD_SIZE } from "../Shared";
import "react-lazy-load-image-component/src/effects/opacity.css";
import Button from "./Button";
import { BsPlayCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ScoreCard from "./ScoreCard";

function Card({ data, type, typeNavigate = null }) {
  const navigate = useNavigate();
  const {
    name,
    title,
    id,
    poster_path,
    profile_path,
    vote_average: score,
    typePlayer,
  } = data;
  const handleToDetail = () => {
    if (!typeNavigate) {
      navigate(`/detail/${id}/${typePlayer}`);
      return;
    }
    if (typeNavigate === "person") {
      navigate(`/people/${id}`);
    } else {
      navigate(`/detail/${id}/${typeNavigate}`);
    }
  };

  return (
    <div className="w-full p-2 ">
      <div
        onClick={handleToDetail}
        className="relative rounded-md  overflow-hidden  cursor-pointer bg-gray-500 card-shadow group"
      >
        <div className="w-full h-auto overflow-hidden relative ">
          <LazyLoadImage
            style={{
              height: IMAGE_CARD_SIZE[type === "ALBUM" ? 1 : 0].height,
            }}
            src={getImageUrl(poster_path ? poster_path : profile_path, "w500")}
            alt={title || name}
            className="w-full bg-gray-50  object-cover group-hover:scale-125 transition-all duration-300 ease-linear"
            effect="opacity"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-300 ease-linear "></div>
          {typeNavigate !== "person" && (
            <div className="flex  items-center justify-center absolute top-0 left-0 right-0 bottom-0  opacity-0 group-hover:opacity-100 transition-all duration-300 ease-linear ">
              <button>
                <Button size={"text-5xl text-white dark:text-white"}>
                  <BsPlayCircle />
                </Button>
              </button>
            </div>
          )}
        </div>
        <div className="py-2 px-2 dark:bg-gray-900 bg-white">
          <p className="sub-title dark:text-white text-gray-800 group-hover:text-blue-600 transition-all duration-300 ease-linear">
            {title || name}
          </p>
        </div>
        {typeof score === "number" && <ScoreCard score={score} />}
      </div>
    </div>
  );
}

export default Card;
