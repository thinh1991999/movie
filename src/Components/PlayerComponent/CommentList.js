import { child, get, ref, remove, update } from "firebase/database";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import "moment/locale/en-gb";
import "moment/locale/vi";
import { db, unKnowUserUrl } from "../../Shared";
import { actions } from "../../Store";
import Modal from "../Modal";
import SquareButton from "../SquareButton";
import DetailComment from "./DetailComment";
import CommentSetting from "./CommentSetting";
import UpdateComment from "./UpdateComment";

export default function CommentList({ comments, infoUsers, id }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const showModal = useSelector((state) => state.root.showModal);
  const language = useSelector((state) => state.root.language);

  const settingRef = useRef(null);
  const btnSettingRefs = useRef({}).current;
  const [settingId, setSettingId] = useState(null);
  const [settingIdMobile, setSettingIdMobile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [detailUser, setDetailUser] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [postionSettings, setPositionSettings] = useState({});

  const setUpLike = (key, method, unMethod) => {
    const updates = {};
    const fIndex = _.findIndex(comments, (o) => o.id === key);
    const list = comments[fIndex].data[method];
    const trigger = list ? list[user.uid] : 0;
    if (trigger === 1) {
      updates["/comments/" + id + "/" + key + `/${method}/` + user.uid] = null;
    } else {
      updates["/comments/" + id + "/" + key + `/${method}/` + user.uid] = 1;
      updates["/comments/" + id + "/" + key + `/${unMethod}/` + user.uid] =
        null;
    }
    update(ref(db), updates);
  };

  const handleShowSetting = (idComment) => {
    if (idComment === settingId) {
      setSettingId(null);
    } else {
      setSettingId(idComment);
    }
  };
  const handleShowSettingMoblie = (id) => {
    setSettingIdMobile(id);
    dispatch(actions.setShowModal(true));
  };

  const handleDelete = () => {
    const path = "/comments/" + id + "/" + deleteId + "/";
    get(child(ref(db), path))
      .then((snapshot) => {
        if (snapshot.exists) {
          remove(ref(db, path))
            .then(() => {
              dispatch(actions.setShowModal(false));
            })
            .catch(() => {
              dispatch(actions.setShowModal(false));
            });
        }
      })
      .catch(() => {
        dispatch(actions.setShowModal(false));
      });
  };

  const handleHideComment = (idComment) => {
    const path = "/comments/" + id + "/" + idComment + "/hides/";
    get(child(ref(db), path)).then((snapshot) => {
      if (snapshot.val()) {
        const hideList = snapshot.val();
        if (hideList[user.uid]) {
          remove(ref(db, path + user.uid));
        } else {
          const updates = {};
          updates[path + user.uid] = 1;
          update(ref(db), updates);
        }
        setSettingId(null);
        dispatch(actions.setShowModal(false));
      } else {
        const updates = {};
        updates[path + user.uid] = 1;
        update(ref(db), updates);
        dispatch(actions.setShowModal(false));
      }
    });
  };

  useEffect(() => {
    const clickEvent = (e) => {
      let checked = true;
      _.forIn(btnSettingRefs, function (_, key) {
        if (btnSettingRefs[key]?.contains(e.target)) {
          checked = false;
        }
      });
      if (checked) {
        setSettingId(null);
      }
    };
    if (settingId) {
      window.addEventListener("click", clickEvent);
    }
    return () => {
      window.removeEventListener("click", clickEvent);
    };
  }, [settingId, btnSettingRefs]);

  useEffect(() => {
    if (showModal) {
      setSettingId(null);
    }
    if (!showModal) {
      setDeleteId(null);
      setDetailUser(null);
    }
  }, [showModal]);

  useEffect(() => {
    if (comments.length > 0 && btnSettingRefs) {
      const windowWidth = window.innerWidth;
      const posObj = {};
      _.forIn(btnSettingRefs, function (_, key) {
        if (btnSettingRefs[key]) {
          const { right } = btnSettingRefs[key].getBoundingClientRect();
          const sizeCheck = windowWidth - right;
          let pos = "L";
          if (sizeCheck >= 350) {
            pos = "L";
          } else if (sizeCheck >= 200 && sizeCheck < 350) {
            pos = "CT";
          } else {
            pos = "R";
          }
          posObj[key] = pos;
        }
      });
      setPositionSettings({ ...posObj });
    }
  }, [comments, btnSettingRefs, showAll]);
  return (
    <>
      <ul className="mt-5">
        {comments.map((item, index) => {
          const {
            id: idComment,
            data: { sentBy, comment, hides, created, like, dislike },
          } = item;
          if (idComment === updateId) {
            return (
              <li key={`${index}${idComment}`}>
                <UpdateComment
                  idComment={idComment}
                  idPlayer={id}
                  setUpdateId={setUpdateId}
                  comment={comment}
                />
              </li>
            );
          }
          const disliked = dislike ? dislike[user?.uid] : 0;
          const countDisLiked = dislike ? Object.keys(dislike).length : 0;
          const liked = like ? like[user?.uid] : 0;
          const countLiked = like ? Object.keys(like).length : 0;
          moment.locale(language.momentSetup);
          const timeUTC = moment.unix(created).utc().format();
          const timeFromNow = moment(timeUTC).fromNow();
          const checkHided = hides?.[user?.uid] ? true : false;
          if (index > 5 && !showAll) return null;
          return (
            <li
              key={`${index}${idComment}`}
              className={` flex justify-between items-center mt-5 group relative`}
            >
              <div
                className={`${
                  checkHided ? "opacity-50" : ""
                } absolute left-0 h-[50px] w-[50px] rounded-full overflow-hidden`}
              >
                <img
                  src={infoUsers[sentBy]?.avatar || unKnowUserUrl}
                  alt=""
                  className="h-full w-full"
                />
              </div>
              <div className="pl-[60px] w-full flex items-center">
                <div
                  className={`${
                    checkHided ? "opacity-50" : ""
                  } flex flex-col max-w-[90%]`}
                >
                  <h3>
                    {infoUsers[sentBy]?.email}
                    <span className="text-sm font-thin ml-1 dark:text-gray-300 text-gray-600">
                      {timeFromNow}
                    </span>
                  </h3>
                  <p className="break-words ">{comment}</p>
                  <div className={`${checkHided ? "hidden" : "flex"} `}>
                    <button
                      onClick={() => setUpLike(idComment, "like", "dislike")}
                      className={`${
                        liked === 1 && `text-blue-600`
                      } flex items-center mr-3 text-xl hover:opacity-50 transition-all duration-300 ease-linear`}
                    >
                      <AiFillLike />
                      <span className="ml-1 text-sm">{countLiked}</span>
                    </button>
                    <button
                      onClick={() => setUpLike(idComment, "dislike", "like")}
                      className={`${
                        disliked === 1 && `text-blue-600`
                      } flex items-center mr-3 text-xl hover:opacity-50 transition-all duration-300 ease-linear`}
                    >
                      <AiFillDislike />
                      <span className="ml-1 text-sm">{countDisLiked}</span>
                    </button>
                    <button
                      onClick={() => handleShowSettingMoblie(idComment)}
                      className={`smm:hidden p-1 overflow-hidden rounded-full hover:bg-gray-300  dark:hover:bg-gray-500/[0.4]`}
                    >
                      <BsThreeDots />
                    </button>
                  </div>
                  <div className={`${checkHided ? "block" : "hidden"}`}>
                    <button
                      onClick={() => handleHideComment(idComment)}
                      className="hover:underline hover:opacity-50 capitalize"
                    >
                      {language.unhide}
                    </button>
                  </div>
                </div>
                <div className="smm:block hidden ml-2 relative">
                  <button
                    onClick={() => handleShowSetting(idComment)}
                    ref={(ref) => (btnSettingRefs[idComment] = ref)}
                    className="smm:group-hover:visible invisible p-1 overflow-hidden rounded-full hover:bg-gray-300  dark:hover:bg-gray-500/[0.4]"
                  >
                    <BsThreeDots />
                  </button>
                  {idComment === settingId && (
                    <div
                      ref={settingRef}
                      className={`${
                        postionSettings[idComment] === "L"
                          ? "left-0"
                          : postionSettings[idComment] === "R"
                          ? "right-0"
                          : "left-0 -translate-x-[50%]"
                      } absolute top-full z-[55] `}
                    >
                      <CommentSetting
                        item={item}
                        idPlayer={id}
                        checkHided={checkHided}
                        setDetailUser={setDetailUser}
                        setDeleteId={setDeleteId}
                        setUpdateId={setUpdateId}
                        setSettingId={setSettingId}
                      />
                    </div>
                  )}
                </div>
              </div>
              {showModal && idComment === settingIdMobile && (
                <Modal
                  bg={"bg-gray-200 dark:bg-gray-900"}
                  pd="p-2"
                  colorBtn="dark:text-white text-gray-800"
                >
                  <CommentSetting
                    item={item}
                    idPlayer={id}
                    checkHided={checkHided}
                    setDetailUser={setDetailUser}
                    setDeleteId={setDeleteId}
                    setUpdateId={setUpdateId}
                    setSettingId={setSettingId}
                  />
                </Modal>
              )}
            </li>
          );
        })}
      </ul>
      {comments?.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 hover:text-blue-600 animation-global"
        >
          {showAll ? "Show less comments" : "Show all comments"}
        </button>
      )}
      {showModal && deleteId && (
        <Modal>
          <div className="mt-2 w-[300px] md:min-w-[320px] text-white flex flex-col justify-between h-full">
            <div className="">
              <h5 className="text-2xl font-bold">{language.deleteCmt}</h5>
              <span>{language.sureDeleteCmt}</span>
            </div>
            <div className="mt-20 flex items-center justify-end">
              <button onClick={() => dispatch(actions.setShowModal(false))}>
                <SquareButton
                  bg={"bg-blue-600"}
                  color="text-white"
                  border={true}
                >
                  {language.cancer}
                </SquareButton>
              </button>
              <button className="ml-4" onClick={handleDelete}>
                <SquareButton
                  bg={"bg-red-600"}
                  color="text-white"
                  border={true}
                >
                  {language.delete}
                </SquareButton>
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showModal && detailUser && (
        <Modal>
          <DetailComment detailUser={detailUser}></DetailComment>
        </Modal>
      )}
    </>
  );
}
