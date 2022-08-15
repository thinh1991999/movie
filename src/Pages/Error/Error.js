import { child, push, ref, update } from "firebase/database";
import { Timestamp } from "firebase/firestore";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logo, MessNoti, Modal, SquareButton } from "../../Components";
import { db } from "../../Shared";
import Validator from "../../Shared/validator";
import { actions } from "../../Store";

export default function Error({ notFound = false }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);
  const showModal = useSelector((state) => state.root.showModal);

  const [showModalErr, setShowModalErr] = useState(false);
  const [problemValues, setProblemValues] = useState({
    name: "",
    errDescription: "",
  });
  const [errors, setErrors] = useState({});
  const [mess, setMess] = useState({
    type: true,
    value: "",
  });
  const rules = useMemo(
    () => [
      {
        field: "name",
        method: "isEmpty",
        validWhen: false,
        message: language.nameRequire,
      },
      {
        field: "errDescription",
        method: "isEmpty",
        validWhen: false,
        message: language.errorRequire,
      },
    ],
    [language]
  );
  const validator = useRef(new Validator(rules)).current;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validator.validate(problemValues));
    if (validator.isValid) {
      const { name, errDescription } = problemValues;
      const values = {
        sentBy: name,
        description: errDescription.trim(),
        created: Timestamp.fromDate(new Date()).seconds,
      };
      const newErrDescription = push(child(ref(db), "errorsDescription")).key;
      const updates = {};
      updates["/errorsDescription/" + newErrDescription] = values;
      update(ref(db), updates);
      setProblemValues({
        ...problemValues,
        errDescription: "",
      });
      setMess({
        type: true,
        value: "Đã gửi báo cáo lỗi thành công",
      });
    }
  };

  const handleFocus = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
    setMess({
      type: true,
      value: "",
    });
  };

  useEffect(() => {
    if (!showModal) {
      setShowModalErr(false);
      setErrors({});
    }
  }, [showModal]);

  useEffect(() => {
    document.title = language.error;
  }, [language]);
  return (
    <>
      <div className="w-screen h-screen  relative bg-black">
        <div className="absolute top-5 left-5">
          <Logo white={true} />
        </div>
        <div className="h-full w-full flex flex-wrap p-[20px]  md:py-0 md:px-[100px] overflow-y-scroll">
          <div className="w-full md:w-6/12 flex justify-center items-center">
            <img src="/err.png" className="w-[300px] md:w-[500px]" alt="" />
          </div>
          <div className="w-full md:w-6/12 flex flex-col justify-center items-center text-white">
            <h5 className="text-xl md:text-3xl lg:text-5xl text-center font-serif tracking-[10px] mb-5">
              AWWW...{language.errDontCry}.
            </h5>
            <span className="text-md lg:text-xl text-gray-400">
              {notFound ? language.errPageNotFound : language.err404}
            </span>
            <p className="text-md lg:text-xl text-center text-gray-400">
              {language.errMess}
            </p>
            <div className="mt-5">
              <Link to={"/"} className="mx-2 px-2 inline-block">
                <SquareButton
                  border={true}
                  bg={"bg-transparent"}
                  color="text-white"
                  msg={language.home}
                />
              </Link>
              <button
                className="mx-2"
                onClick={() => {
                  dispatch(actions.setShowModal(true));
                  setShowModalErr(true);
                }}
              >
                <SquareButton
                  border={true}
                  bg={"bg-red-600"}
                  color="text-white"
                  msg={language.reportProblem}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && showModalErr && (
        <Modal>
          <div className="max-w-[500px] smm:min-w-[320px] min-w-[300px] text-white">
            <form onSubmit={handleSubmit}>
              <h5 className=" text-xl font-bold uppercase">
                {language.reportProblem}
              </h5>
              <div className="flex flex-col my-5">
                <label className="font-bold" htmlFor="name">
                  {language.name}
                </label>
                <input
                  id="name"
                  type="text"
                  className={`${
                    errors?.name ? "border-red-600" : "border-gray-300"
                  } outline-none bg-transparent border-[1px] px-3 py-2 rounded-sm placeholder:text-gray-100`}
                  placeholder={language.yourName}
                  value={problemValues.name}
                  name={"name"}
                  onChange={(e) =>
                    setProblemValues({
                      ...problemValues,
                      name: e.target.value,
                    })
                  }
                  onFocus={handleFocus}
                />
                <MessNoti
                  mess={{ type: false, value: errors?.name }}
                ></MessNoti>
              </div>
              <div className="flex flex-col my-5">
                <label className="font-bold" htmlFor="errDescription">
                  {language.errorDescription}
                </label>
                <textarea
                  name="errDescription"
                  id="errDescription"
                  className={`${
                    errors?.errDescription
                      ? "border-red-600"
                      : "border-gray-300"
                  } outline-none bg-transparent border-[1px] px-3 py-2 rounded-sm placeholder:text-gray-100`}
                  cols="30"
                  rows="4"
                  placeholder={language.yourErrorDescription}
                  value={problemValues.errDescription}
                  onChange={(e) =>
                    setProblemValues({
                      ...problemValues,
                      errDescription: e.target.value,
                    })
                  }
                  onFocus={handleFocus}
                ></textarea>
                <MessNoti
                  mess={{ type: false, value: errors?.errDescription }}
                ></MessNoti>
                <MessNoti mess={mess}></MessNoti>
              </div>
              <div className="flex justify-end ">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(actions.setShowModal(false));
                  }}
                >
                  <SquareButton
                    bg={"bg-blue-600"}
                    color="text-white"
                    border={true}
                  >
                    {language.cancer}
                  </SquareButton>
                </button>
                <button className="ml-4">
                  <SquareButton
                    bg={"bg-red-600"}
                    color="text-white"
                    border={true}
                  >
                    {language.submit}
                  </SquareButton>
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
