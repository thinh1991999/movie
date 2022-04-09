import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";
import Loading from "../Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getImageUrl } from "../../Shared";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreditsSlider({ data }) {
  const language = useSelector((state) => state.root.language);
  const navigate = useNavigate();

  const handleToPeoplePage = (id) => {
    navigate(`/people/${id}`);
  };

  return (
    <div className=" w-full">
      <h2 className="text-xl text-gray-800 dark:text-white capitalize">
        {language.detailCharacters}
      </h2>
      <div className="ml-[-0.5rem] mr-[-0.5rem]">
        <Swiper
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            426: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1440: {
              slidesPerView: 6,
            },
          }}
          modules={[Navigation]}
          navigation={true}
        >
          {data.map((item, index) => {
            const { id, profile_path, name, character } = item;
            return (
              <SwiperSlide key={`${id}${index}`}>
                <div className="p-2">
                  <div
                    onClick={() => handleToPeoplePage(id)}
                    className="w-full group cursor-pointer bg-gray-200/[0.8] dark:bg-gray-900/[0.3] rounded-xl"
                  >
                    <div className="relative inline-block w-full">
                      <div className="mt-[100%]"></div>
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center rounded-full overflow-hidden">
                        <LazyLoadImage
                          style={{ height: "100%" }}
                          src={getImageUrl(profile_path, "w500")}
                          alt=""
                          className="h-full bg-gray-50  object-cover group-hover:scale-125 transition-all duration-300 ease-linear"
                          effect="opacity"
                        />
                      </div>
                    </div>
                    <div className="w-full text-center flex flex-col items-center">
                      <span className="text-gray-800 text-xl font-bold dark:text-white sub-title group-hover:text-blue-600 transition-all duration-300 ease-linear">
                        {name}
                      </span>
                      <span className="text-gray-800 text-sm dark:text-white sub-title">
                        {character}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default CreditsSlider;
