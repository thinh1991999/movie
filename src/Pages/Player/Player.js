import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actions } from "../../Store";
import { axios } from "../../Shared";
import { AiFillStar, AiFillTags } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SquareButton } from "../../Components";

function Player() {
  const { id, category } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [episode, setEpisode] = useState(1);
  const [mediaUrl, setMediaUrl] = useState("");
  const dispatch = useDispatch();

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

  const getMedia = async () => {
    const { id: episodeId } = detailData.episodeVo[episode];
    await axios
      .get("media/previewInfo", {
        params: {
          category: category || 1,
          contentId: id,
          episodeId,
          definition: "GROOT_HD",
        },
      })
      .then((res) => {
        const { data } = res;
        setMediaUrl(data.data.mediaUrl);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getDetail();
  }, [id, category]);

  useEffect(() => {
    if (detailData) {
      getMedia();
    }
  }, [detailData]);

  useEffect(() => {
    dispatch(actions.setBgHeader(true));
  }, []);

  if (!detailData && !mediaUrl) {
    return (
      <div className="">
        <h2>Loading</h2>
      </div>
    );
  }

  const {
    name,
    score,
    year,
    tagList,
    episodeCount,
    areaNameList,
    seriesNo,
    introduction,
  } = detailData;
  console.log(mediaUrl);
  return (
    <div className="h-screen pt-16 pb-10 px-5 w-full overflow-y-auto">
      <div className="flex">
        <div className="lg:w-3/4">
          <div className="mb-5">
            <iframe
              width="100%"
              height="500"
              src={mediaUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            ></iframe>
          </div>
          <div className="">
            <h4>Episodes</h4>
            <div className=""></div>
          </div>
          <h3 className="text-3xl text-gray-800 dark:text-white">{name}</h3>
          <div className="flex text-xl items-center mt-2 text-gray-800 dark:text-white">
            <AiFillStar className="text-yellow-300" />
            <span className="ml-1 text-base">{score}</span>
            <img src="/calendar.png" alt="" className="lg:h-5 ml-4" />
            <span className="ml-1 text-base">{year}</span>
          </div>
          <div className="mt-5 flex items-center">
            <AiFillTags className="mr-2 text-xl text-yellow-400" />
            {tagList.map((item) => {
              const { name, id } = item;
              return (
                <Link to={`/explored/${id}`} key={id} className="mr-2">
                  <SquareButton msg={name} bd={false} detail={true} />
                </Link>
              );
            })}
          </div>
          <p className="mt-2 text-gray-800 dark:text-white text-base">
            {introduction}
          </p>
        </div>
        <div className="lg:w-1/4 h-full"></div>
      </div>
    </div>
  );
}

export default Player;
