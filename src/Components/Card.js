import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGE_CARD_SIZE, resizeImage } from "../Shared";
import "react-lazy-load-image-component/src/effects/opacity.css";
import Button from "./Button";
import { BsPlayCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Card({ data, type }) {
  const navigate = useNavigate();

  const { imageUrl, coverVerticalUrl, name, title, id, category, score } = data;

  const handleToDetail = () => {
    navigate(`/detail/${id}/${category}`);
  };

  return (
    <div className="w-full p-2 ">
      <div className="rounded-md group overflow-hidden group cursor-pointer bg-gray-500 card-shadow">
        <div className="w-full h-auto overflow-hidden relative ">
          <LazyLoadImage
            style={{
              height: IMAGE_CARD_SIZE[type === "ALBUM" ? 1 : 0].height,
            }}
            src={resizeImage(
              imageUrl || coverVerticalUrl,
              IMAGE_CARD_SIZE[type === "ALBUM" ? 1 : 0].width,
              IMAGE_CARD_SIZE[type === "ALBUM" ? 1 : 0].height
            )}
            alt={title || name}
            className="w-full bg-gray-50  object-cover group-hover:scale-125 transition-all duration-300 ease-linear"
            effect="opacity"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-300 ease-linear "></div>
          <div className="flex  items-center justify-center absolute top-0 left-0 right-0 bottom-0  opacity-0 group-hover:opacity-100 transition-all duration-300 ease-linear ">
            <button onClick={handleToDetail}>
              <Button size={"text-5xl"}>
                <BsPlayCircle />
              </Button>
            </button>
          </div>
        </div>
        <div className="py-2 px-2 bg-gray-700  ">
          <p className="sub-title text-white group-hover:text-blue-600 transition-all duration-300 ease-linear">
            {title || name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
