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
              <>
                <li key={idComment}>
                  <UpdateComment
                    idComment={idComment}
                    idPlayer={id}
                    setUpdateId={setUpdateId}
                    comment={comment}
                  />
                </li>
              </>
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
              key={idComment}
              className={`${
                checkHided ? "opacity-50" : ""
              } flex items-center mt-5 group`}
            >
              <div className="h-[50px] w-[50px] mr-2  rounded-full overflow-hidden">
                <img
                  src={infoUsers[sentBy]?.avatar || unKnowUserUrl}
                  alt=""
                  className="h-full w-full"
                />
              </div>
              <div className="max-w-[80%]">
                <h3>
                  {infoUsers[sentBy]?.email}
                  <span className="text-sm font-thin ml-1 dark:text-gray-300 text-gray-600">
                    {timeFromNow}
                  </span>
                </h3>
                <p className="break-words">{comment}</p>
                <div className="flex">
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
              </div>
              <div className=" ml-2 relative">
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
                    } absolute top-full z-50 `}
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
          <div className="mt-2 min-w-[300px] text-white">
            <h5 className="text-2xl font-bold">Xóa đánh giá</h5>
            <span>Bạn có chắc muốn xóa đánh giá này?</span>
            <div className="mt-10 flex items-center justify-end">
              <button onClick={() => dispatch(actions.setShowModal(false))}>
                <SquareButton
                  bg={"bg-blue-600"}
                  color="text-white"
                  border={true}
                >
                  Hủy
                </SquareButton>
              </button>
              <button className="ml-4" onClick={handleDelete}>
                <SquareButton
                  bg={"bg-red-600"}
                  color="text-white"
                  border={true}
                >
                  Xóa
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
