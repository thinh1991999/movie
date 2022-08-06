import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";

function TrailerModal() {
  const key = useSelector((state) => state.detail.showTrailerModal.key);

  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const wrapRef = useRef(null);
  const [iframeWidth, setIframeWidth] = useState(560);
  const [iframeHeight, setIframeHeight] = useState(560);

  const handleCloseModal = (e) => {
    if (e.target === containerRef.current) {
      dispatch(
        actions.setShowTrailerModal({
          show: false,
          key: "",
        })
      );
    }
  };

  const handleSetSizeIframe = useCallback(
    (size) => {
      if (size > 700) {
        setIframeWidth(560);
        setIframeHeight(315);
      } else {
        setIframeWidth(320);
        setIframeHeight(200);
      }
    },
    [iframeWidth, iframeHeight]
  );

  useEffect(() => {
    const eventResize = (e) => {
      handleSetSizeIframe(e.target.innerWidth);
    };
    window.addEventListener("resize", eventResize);
    return () => {
      window.removeEventListener("resize", eventResize);
    };
  }, [iframeWidth, iframeHeight]);

  useEffect(() => {
    handleSetSizeIframe(window.innerWidth);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-black/[0.5] z-50"
      ref={containerRef}
      onClick={handleCloseModal}
    >
      <div className="rounded-xl py-10 bg-black relative" ref={wrapRef}>
        <iframe
          title="trailer"
          width={iframeWidth}
          height={iframeHeight}
          src={`https://www.youtube.com/embed/${key}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>

        <button
          className="absolute top-2 right-2 text-white"
          onClick={() => dispatch(actions.setShowTrailerModal(false))}
        >
          <Button>
            <AiOutlineClose />
          </Button>
        </button>
      </div>
    </div>
  );
}

export default TrailerModal;
