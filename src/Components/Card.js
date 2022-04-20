import { LazyLoadImage } from "react-lazy-load-image-component";
import { getImageUrl, IMAGE_CARD_SIZE, resizeImage } from "../Shared";
import "react-lazy-load-image-component/src/effects/opacity.css";
import Button from "./Button";
import { BsPlayCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Card({ data, type, typeNavigate }) {
  const navigate = useNavigate();
  const {
    name,
    title,
    id,
    poster_path,
    profile_path,
    vote_average: score,
  } = data;
  const handleToDetail = () => {
    if (typeNavigate === "person") {
      navigate(`/people/${id}`);
    } else {
      navigate(`/detail/${id}/${typeNavigate}`);
    }
  };

  let color = "border-red-500";
  if (score >= 0 && score < 5) {
    color = "border-red-500";
  } else if (score >= 5 && score < 7.5) {
    color = "border-yellow-500";
  } else {
    color = "border-green-500";
  }
  return (
    <div className="w-full p-2 ">
      <div
        onClick={handleToDetail}
        className="relative rounded-md group overflow-hidden group  cursor-pointer bg-gray-500 card-shadow"
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
        <div className="py-2 px-2 bg-gray-700  ">
          <p className="sub-title text-white group-hover:text-blue-600 transition-all duration-300 ease-linear">
            {title || name}
          </p>
        </div>
        {typeof score === "number" && (
          <div className="absolute top-2 left-2">
            <div className="relative w-9 h-9 flex items-center justify-center rounded-full bg-black">
              <span className="text-white absolute z-20 w-full h-full block flex justify-center items-center">
                {score?.toFixed(1)}
              </span>
              <div className="slice absolute w-full h-full ">
                {score > 5 ? (
                  <div
                    className={`absolute w-full h-full border-2 ${color} rounded-full`}
                    style={{
                      clip: `rect(0,20px,40px,0)`,
                      transform: `rotate(${180 + (180 / 5) * (score - 5)}deg)`,
                    }}
                  ></div>
                ) : (
                  <div
                    className={`absolute w-full h-full bg-black rounded-full z-10`}
                    style={{
                      clip: `rect(0,20px,40px,0)`,
                      transform: `rotate(${0}deg)`,
                    }}
                  ></div>
                )}

                {score !== 0 && (
                  <div
                    className={`absolute w-full h-full border-2 ${color} rounded-full`}
                    style={{
                      clip: `rect(0,20px,40px,0)`,
                      transform: `${
                        score > 5
                          ? `rotate(180deg)`
                          : `rotate(${(180 / 5) * score}deg)`
                      }`,
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
