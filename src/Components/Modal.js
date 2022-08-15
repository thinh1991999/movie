import { useRef } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../Store";
import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai";

function Modal({
  children,
  bg = "bg-gradient-to-r from-violet-500 to-fuchsia-500",
  pd = "px-10 py-5",
  colorBtn = "text-white",
}) {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const wrapRef = useRef(null);
  const handleCloseModal = (e) => {
    if (e.target === containerRef.current) {
      dispatch(actions.setShowModal(false));
    }
  };

  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-black/[0.3] z-50"
      ref={containerRef}
      onClick={handleCloseModal}
    >
      <div className={`${bg} ${pd}  max-w-xl rounded-xl `} ref={wrapRef}>
        <div className="h-full flex flex-col ">
          <div className={`${colorBtn} flex justify-end text-white `}>
            <button onClick={() => dispatch(actions.setShowModal(false))}>
              <Button>
                <AiOutlineClose />
              </Button>
            </button>
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
