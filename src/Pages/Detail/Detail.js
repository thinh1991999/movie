import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CreditsSlider,
  DetailSlider,
  InfoDetail,
  Loading,
  TrailerModal,
  TrailerSlider,
} from "../../Components";
import { axios, getImageUrl, resizeImage } from "../../Shared";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";
import { getCredits, getDetail, getSmilar, getVideos } from "../../Services";

function Detail() {
  const showTrailerModal = useSelector(
    (state) => state.detail.showTrailerModal
  );

  const dispatch = useDispatch();
  const { id, type } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [similarData, setSimilarData] = useState(null);
  const [creditsData, setCreditsData] = useState(null);
  const [trailerData, setTrailerData] = useState(null);

  const handleScroll = (e) => {
    if (e.target.scrollTop > 0) {
      dispatch(actions.setBgHeader(true));
    } else {
      dispatch(actions.setBgHeader(false));
    }
  };

  useEffect(async () => {
    setDetailData(null);
    setSimilarData(null);
    setCreditsData(null);
    setTrailerData(null);
    await getDetail(id, type).then((res) => {
      setDetailData(res);
    });
    await getCredits(id, type).then((res) => {
      setCreditsData(res);
    });
    await getVideos(id, type).then((res) => {
      setTrailerData(res.results);
    });
    await getSmilar(id, type, 1).then((res) => {
      setSimilarData(res);
    });
  }, [id, type]);

  useEffect(() => {
    dispatch(actions.setBgHeader(false));
  }, []);

  if (!detailData && !similarData) {
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

  const { backdrop_path: bgImg, poster_path: showImg, seasons } = detailData;
  console.log(similarData);
  return (
    <div
      className="h-screen pb-10 overflow-y-scroll scroll-list scroll-smooth"
      onScroll={handleScroll}
    >
      <div className="relative ">
        <LazyLoadImage
          src={getImageUrl(bgImg, "w1280")}
          className="h-[900px] md:h-[550px] lg:h-[550px] object-cover object-center w-full"
          alt=""
        />
        <div className="absolute top-0 py-16 left-0 bottom-0 right-0 bg-detail bg-gray-600/[0.8] dark:bg-black/[0.8]"></div>
        <div className="absolute top-0 py-16 sm:py-0 left-0 bottom-0 right-0 flex flex-col md:flex-row justify-center items-center">
          <div className="h-full w-full md:w-2/5 lg:w-2/5 flex justify-center items-center">
            <LazyLoadImage
              src={getImageUrl(showImg, "w500")}
              className="h-[360px] md:h-[360px] lg:h-[400px] rounded-2xl"
              alt=""
            />
          </div>
          <div className="w-full md:w-3/5 lg:w-2/5">
            <InfoDetail data={detailData} type={type} />
          </div>
        </div>
      </div>

      <div className="px-5">
        {creditsData && (
          <div className="mt-10">
            <CreditsSlider data={creditsData?.cast} />
          </div>
        )}

        {trailerData?.length > 0 && (
          <div className="mt-10">
            <TrailerSlider data={trailerData} />
          </div>
        )}
        {seasons?.length > 0 && (
          <div className="mt-10">
            <DetailSlider
              data={seasons}
              title={"In the series"}
              typeNavigate={type}
            />
          </div>
        )}

        {similarData && similarData?.results.length > 0 && (
          <div className="mt-10">
            <DetailSlider
              data={similarData}
              title={"Similar to this"}
              typeNavigate={type}
            />
          </div>
        )}
      </div>
      {showTrailerModal?.show && <TrailerModal />}
    </div>
  );
}

export default Detail;
