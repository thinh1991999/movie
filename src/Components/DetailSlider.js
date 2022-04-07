import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";
import Card from "./Card";
import Loading from "./Loading";

function DetailSlider({ data, title, full, typeNavigate }) {
  if (!data) {
    return (
      <div className="py-10 w-full">
        <h2 className="text-xl text-gray-800 dark:text-white h-[30px] w-[80px]">
          <Loading />
        </h2>
        <div className="ml-[-0.5rem] mr-[-0.5rem]">
          <Swiper
            slidesPerView={4}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              426: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: `${full ? 6 : 4}`,
              },
              1440: {
                slidesPerView: 6,
              },
            }}
            modules={[Navigation]}
            navigation={true}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((item) => {
              return (
                <SwiperSlide key={item}>
                  <div className="p-2 h-[225px]">
                    <Loading />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    );
  }
  return (
    <div className=" w-full">
      <h2 className="text-xl text-gray-800 dark:text-white capitalize">
        {title}
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
          {data.results?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Card data={item} type={"ALBUM"} typeNavigate={typeNavigate} />
              </SwiperSlide>
            );
          })}
          {data.length > 0 &&
            data?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Card
                    data={item}
                    type={"ALBUM"}
                    typeNavigate={typeNavigate}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default DetailSlider;
