import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import {
  CreditsSlider,
  DetailSlider,
  InfoDetail,
  Loading,
  TrailerModal,
  TrailerSlider,
} from "../../Components";
import { getImageUrl } from "../../Shared";
import { actions } from "../../Store";
import httpService from "../../Services/http.service";

function Detail() {
  const showTrailerModal = useSelector(
    (state) => state.detail.showTrailerModal
  );
  const language = useSelector((state) => state.root.language);

  const dispatch = useDispatch();
  const { id, type } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [similarData, setSimilarData] = useState(null);
  const [creditsData, setCreditsData] = useState(null);
  const [trailerData, setTrailerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleScroll = (e) => {
    if (e.target.scrollTop > 0) {
      dispatch(actions.setBgHeader(true));
    } else {
      dispatch(actions.setBgHeader(false));
    }
  };

  useEffect(() => {
    setLoading(true);
    setDetailData(null);
    setSimilarData(null);
    setCreditsData(null);
    setTrailerData(null);
    const call1 = httpService.getDetail(id, type).then((res) => {
      return res.data;
    });
    const call2 = httpService.getCredits(id, type).then((res) => {
      return res.data;
    });
    const call3 = httpService.getVideos(id, type).then((res) => {
      return res.data;
    });
    const call4 = httpService.getSmilar(id, type, 1).then((res) => {
      return res.data;
    });
    Promise.all([call1, call2, call3, call4]).then((res) => {
      setDetailData(res[0]);
      setCreditsData(res[1]);
      setTrailerData(res[2].results);
      setSimilarData(res[3]);
      setLoading(false);
    });
  }, [id, type]);

  useEffect(() => {
    dispatch(actions.setBgHeader(false));
  }, []);

  if (loading) {
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
            <InfoDetail
              data={detailData}
              trailerLength={trailerData?.length}
              type={type}
            />
          </div>
        </div>
      </div>

      <div className="px-5">
        {creditsData?.cast.length && (
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
              title={language.detailSeris}
              typeNavigate={type}
            />
          </div>
        )}

        {similarData && similarData?.results.length > 0 && (
          <div className="mt-10">
            <DetailSlider
              data={similarData}
              title={language.detailSimilar}
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
