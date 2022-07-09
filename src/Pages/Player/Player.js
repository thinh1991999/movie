import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actions } from "../../Store";
import { Comments, DetailSlider, InforPlayer, Loading } from "../../Components";
import httpService from "../../Services/http.service";
import { getMovieUrl, getTvUrl } from "../../Shared";

function Player() {
  const language = useSelector((state) => state.root.language);
  const dispatch = useDispatch();

  const { id, type, session, episode } = useParams();

  const iframeRef = useRef(null);
  const [detailData, setDetailData] = useState(null);
  const [sessionsData, setSessionsData] = useState([]);
  const [similarData, setSimilarData] = useState(null);
  const [episodeCurrent, setEpisodeCurrent] = useState(null);
  const [sessionCurrent, setSessionCurrent] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [episodeData, setEpisodeData] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    console.log("123");
  };

  useEffect(() => {
    setDetailData(null);
    const call1 = httpService.getDetail(id, type).then((res) => {
      return res.data;
    });
    const call2 = httpService.getSmilar(id, type, 1).then((res) => {
      return res.data;
    });

    Promise.all([call1, call2]).then((res) => {
      setDetailData(res[0]);
      // setSessionsData(res[0]?.seasons);
      setSimilarData(res[1]);
    });
    if (type === "movie") {
      setMediaUrl(getMovieUrl(id));
    }
  }, [id, type]);

  useEffect(() => {
    if (session && episode) {
      httpService.getTvSession(id, session).then((res) => {
        setEpisodeData(res.data);
      });
    }
  }, [session, id]);
  useEffect(() => {
    let timeOutSetMedia;
    if (type === "tv") {
      setMediaUrl(null);
      setEpisodeCurrent(episode);
      setSessionCurrent(session);
      timeOutSetMedia = setTimeout(() => {
        setMediaUrl(getTvUrl(id, session, episode));
      }, 50);
    }
    return () => {
      clearTimeout(timeOutSetMedia);
    };
  }, [episode, session, type]);

  useEffect(() => {
    dispatch(actions.setBgHeader(true));
  }, []);

  useEffect(() => {
    // if (playing) {
    //   console.log(iframeRef.current?.getCurrentTime());
    // }
    console.log(iframeRef.current);
  }, [playing]);

  if (!detailData) {
    return (
      <div className="">
        <h2>Loading</h2>
      </div>
    );
  }

  return (
    <div className="h-screen pt-16 pb-20 px-5 w-full overflow-y-scroll scroll-list">
      <div className="">
        <div className="w-full ">
          <div className="mb-5 h-[500px] bg-gray-400/[0.2] dark:bg-gray-900">
            {mediaUrl ? (
              <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src={mediaUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="object-cover"
              ></iframe>
            ) : (
              <Loading />
            )}
          </div>
          <InforPlayer
            data={detailData}
            episodeData={episodeData}
            episodeCurrent={episodeCurrent}
            sessionCurrent={sessionCurrent}
            id={id}
            type={type}
            session={session}
          />
        </div>
        <Comments id={id} />
        <div className="">
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
      </div>
    </div>
  );
}

export default Player;
