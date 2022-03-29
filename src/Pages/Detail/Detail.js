import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailSlider, InfoDetail, Loading } from "../../Components";
import { axios, resizeImage } from "../../Shared";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { actions } from "../../Store";

function Detail() {
  const dispatch = useDispatch();
  const { id, category } = useParams();
  const [detailData, setDetailData] = useState(null);

  const handleScroll = (e) => {
    if (e.target.scrollTop > 0) {
      dispatch(actions.setBgHeader(true));
    } else {
      dispatch(actions.setBgHeader(false));
    }
  };

  const getDetail = async () => {
    setDetailData(null);
    await axios
      .get("movieDrama/get", {
        params: {
          id,
          category: category || 1,
        },
      })
      .then((res) => {
        const { data } = res;
        setDetailData(data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getDetail();
  }, [id, category]);

  useEffect(() => {}, []);

  if (!detailData) {
    return (
      <div className=" w-full h-screen pt-16 overflow-y-scroll scroll-list">
        <div className="lg:h-[500px] md:h-[450px] w-full">
          <Loading />
        </div>
        <div className="px-5">
          <DetailSlider />
          <DetailSlider />
        </div>
      </div>
    );
  }
  const {
    coverHorizontalUrl: bgImg,
    coverVerticalUrl: showImg,
    refList,
    likeList,
  } = detailData;

  return (
    <div
      className="h-screen pb-10 overflow-y-scroll scroll-list"
      onScroll={handleScroll}
    >
      <div className="relative ">
        <LazyLoadImage
          src={bgImg}
          className="h-[900px] md:h-[550px] lg:h-[550px] object-cover w-full"
          alt=""
        />
        <div className="absolute top-0 py-16 left-0 bottom-0 right-0 bg-detail bg-gray-600/[0.8] dark:bg-black/[0.8]"></div>
        <div className="absolute top-0 py-16 sm:py-0 left-0 bottom-0 right-0 flex flex-col md:flex-row justify-center items-center">
          <div className="h-full w-full md:w-2/5 lg:w-2/5 flex justify-center items-center">
            <LazyLoadImage
              src={resizeImage(showImg, "300", "500")}
              className="h-[360px] md:h-[360px] lg:h-[400px] rounded-2xl"
              alt=""
            />
          </div>
          <div className="w-full md:w-3/5 lg:w-2/5">
            <InfoDetail data={detailData} />
          </div>
        </div>
      </div>
      <div className="px-5">
        {refList.length > 0 && (
          <div className="mt-10">
            <DetailSlider data={refList} title={"In the series"} />
          </div>
        )}
        {likeList.length > 0 && (
          <div className="mt-10">
            <DetailSlider data={likeList} title={"Similar to this"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
