import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

function BannerSlider() {
  return (
    <Swiper
      speed={1000}
      slidesPerView={1}
      navigation
      loop
      modules={[Navigation, Autoplay]}
      className="rounded-2xl"
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide className="">
        <div className=" overflow-hidden w-full relative">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5ac322c445776e9ae9b82917/1522744076528-ZCAVMU7JN9UVHY96V5EX/New+York.jpg?format=2500w"
            alt=""
            className="h-[300px] object-cover w-full object-center"
          />
          <h3 className="absolute bottom-5 font-bold text-xl text-white left-[50%] translate-x-[-50%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            eaque.
          </h3>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default BannerSlider;
