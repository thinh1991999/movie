import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { getImageUrl } from "../../Shared";

function BannerSlider({ data }) {
  const [bannerData, setBannerData] = useState(data);
  const [mount, setMount] = useState(false);
  useEffect(() => {
    if (!mount && data) {
      setBannerData(data);
      setMount(true);
    }
  }, [data, mount]);

  if (!bannerData) {
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
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {bannerData.results.map((item) => {
        const { title, name, id, backdrop_path, media_type } = item;
        return (
          <SwiperSlide key={id} className="">
            <div className=" overflow-hidden w-full relative">
              <Link
                to={`/detail/${id}/${media_type}`}
                className="cursor-pointer"
              >
                <img
                  src={getImageUrl(backdrop_path, "w1280")}
                  alt={title || name}
                  className="lg:h-[350px] md:h-[300px] h-[250px]  object-cover w-full object-center"
                />
                <h3 className="absolute bottom-5 font-bold text-xl text-white left-[50%] translate-x-[-50%]">
                  {title || name}
                </h3>
              </Link>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default BannerSlider;
