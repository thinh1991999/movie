import { useRef } from "react";
import Button from "../Button";
import { AiOutlineClose } from "react-icons/ai";

function DetailModal({ children, setShowDetailModal }) {
  const containerRef = useRef(null);
  const wrapRef = useRef(null);
  const handleCloseModal = (e) => {
    if (e.target === containerRef.current) {
      setShowDetailModal(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-black/[0.5] z-40"
      ref={containerRef}
      onClick={handleCloseModal}
    >
      <div
        className="max-w-xl rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-10 py-5 relative"
        ref={wrapRef}
      >
        {children}
        <button
          className="absolute top-2 right-2"
          onClick={() => setShowDetailModal(false)}
        >
          <Button>
            <AiOutlineClose />
          </Button>
        </button>
      </div>
    </div>
  );
}

export default DetailModal;
