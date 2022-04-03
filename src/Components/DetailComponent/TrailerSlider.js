import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";
import { BsPlayCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";
import { LazyLoadImage } from "react-lazy-load-image-component";

function TrailerSlider({ data }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);

  const handleShowTrailerModal = (key) => {
    dispatch(
      actions.setShowTrailerModal({
        show: true,
        key,
      })
    );
  };

  return (
    <div className=" w-full" id="trailer">
      <h2 className="text-xl text-gray-800 dark:text-white capitalize">
        {language.detailTrailer}
      </h2>
      <div className="ml-[-0.5rem] mr-[-0.5rem]">
        <Swiper
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            426: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1650: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation]}
          navigation={true}
        >
          {data.map((item) => {
            const { id, key } = item;
            return (
              <SwiperSlide key={id}>
                <div className="p-2 h-full">
                  <div className="relative h-full group overflow-hidden">
                    <div className=" h-full">
                      <img
                        src={`https://i.ytimg.com/vi/${key}/hqdefault.jpg`}
                        alt=""
                        className="group-hover:scale-125 h-full transition-all duration-300 ease-linear"
                        effect="opacity"
                      />
                    </div>
                    <div className="absolute  top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-300 ease-linear"></div>
                    <div
                      onClick={() => handleShowTrailerModal(key)}
                      className="absolute cursor-pointer flex items-center justify-center top-0 left-0 right-0 bottom-0  opacity-0 group-hover:opacity-100 transition-all duration-300 ease-linear"
                    >
                      <BsPlayCircle className="text-white text-5xl group-hover:opacity-50 transition-all duration-300 ease-linear" />
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

export default TrailerSlider;
