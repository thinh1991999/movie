import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import Loading from "../Loading";

function BannerSlider({ data }) {
  if (!data) {
    return (
      <div className="w-full  h-[200px] md:h-[250px] lg:h-[300px] ">
        <Loading />
      </div>
    );
  }
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
      {data.map((item) => {
        const { title, imageUrl, id } = item;
        return (
          <SwiperSlide key={id} className="">
            <div className=" overflow-hidden w-full relative">
              <img
                src={imageUrl}
                alt={title}
                className="lg:h-[300px] md:h-[250px] h-[200px]  object-cover w-full object-center"
              />
              <h3 className="absolute bottom-5 font-bold text-xl text-white left-[50%] translate-x-[-50%]">
                {title}
              </h3>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default BannerSlider;
