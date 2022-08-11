import { child, get, ref, remove, update } from "firebase/database";
import _ from "lodash";
import moment from "moment";
import { toast } from "react-toastify";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineSendAndArchive } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "moment/locale/en-gb";
import "moment/locale/vi";
import { db, unKnowUserUrl } from "../../Shared";
import { actions } from "../../Store";
import Modal from "../Modal";
import SquareButton from "../SquareButton";
import DetailComment from "./DetailComment";

export default function CommentList({ comments, infoUsers, id }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const showModal = useSelector((state) => state.root.showModal);
  const language = useSelector((state) => state.root.language);

  const settingRef = useRef(null);
  const [settingId, setSettingId] = useState(null);
  const [settingIdMobile, setSettingIdMobile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [updateValue, setUpdateValue] = useState("");
  const [detailUser, setDetailUser] = useState(null);

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

  const handleShowSetting = (id) => {
    if (id === settingId) {
      setSettingId(null);
    } else {
      setSettingId(id);
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

  const handleCancerUpdate = () => {
    setUpdateId(null);
    setUpdateValue(null);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const path = "/comments/" + id + "/" + updateId + "/comment/";
    const updates = {};
    updates[path] = updateValue;
    update(ref(db), updates)
      .then(() => {
        setUpdateId(null);
        setUpdateValue(null);
      })
      .catch(() => {
        setUpdateId(null);
        setUpdateValue(null);
      });
  };

  const closeModal = useCallback(() => {
    if (showModal) dispatch(actions.setShowModal(false));
    if (settingId) setSettingId(null);
    if (settingIdMobile) setSettingIdMobile(null);
    if (deleteId) setDeleteId(null);
  }, [showModal, dispatch, settingIdMobile, deleteId, settingId]);

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
        closeModal();
      } else {
        const updates = {};
        updates[path + user.uid] = 1;
        update(ref(db), updates);
        closeModal();
      }
    });
  };
  const handleGetDetail = (sentBy) => {
    setSettingIdMobile(false);
    const path = "/users/" + sentBy;
    get(child(ref(db), path)).then((snapshot) => {
      if (snapshot.val()) {
        setDetailUser(snapshot.val());
        dispatch(actions.setShowModal(true));
      } else {
        toast.error("Người dùng này chưa có thông tin");
      }
    });
  };

  useEffect(() => {
    const clickEvent = (e) => {
      if (!settingRef.current?.contains(e.target)) {
        setSettingId(null);
      }
    };
    if (settingId) {
      window.addEventListener("click", clickEvent);
    }
    return () => {
      window.removeEventListener("click", clickEvent);
    };
  }, [settingId]);

  useEffect(() => {
    if (!showModal) {
      setDeleteId(null);
      setDetailUser(null);
    }
  }, [showModal]);

  useEffect(() => {
    const eventKeyPress = (e) => {
      if (e.keyCode === 27) {
        setUpdateId(null);
        setUpdateValue(null);
      }
    };
    if (updateId) {
      window.addEventListener("keydown", eventKeyPress);
    }
    return () => {
      window.removeEventListener("keydown", eventKeyPress);
    };
  }, [updateId]);

  return (
    <>
      <ul className="mt-5">
        {comments.map((item) => {
          const {
            id,
            data: { sentBy, comment, hides, created, like, dislike },
          } = item;
          if (id === updateId) {
            return (
              <>
                <li key={id}>
                  <div className="w-full py-2 px-4 border-2 border-gray-600 dark:border-gray-200 rounded-full mt-5">
                    <form onSubmit={handleSubmitUpdate}>
                      <div className="flex items-center">
                        <img
                          src={infoUsers[sentBy]?.avatar || unKnowUserUrl}
                          alt=""
                          className="h-[40px] w-[40px] bg-white rounded-full mr-2"
                        />
                        <input
                          type="text"
                          placeholder="Your comment..."
                          className="w-full bg-transparent outline-none"
                          value={updateValue}
                          onChange={(e) => setUpdateValue(e.target.value)}
                        />
                        <button type="submit" className="text-3xl">
                          <MdOutlineSendAndArchive />
                        </button>
                      </div>
                    </form>
                  </div>
                  <span className="ml-[calc(50px_+_1rem)] mt-1 block text-sm">
                    Nhấn Esc để{" "}
                    <button
                      className="text-blue-600"
                      onClick={handleCancerUpdate}
                    >
                      Hủy
                    </button>
                  </span>
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
          return (
            <li
              key={id}
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
                    onClick={() => setUpLike(id, "like", "dislike")}
                    className={`${
                      liked === 1 && `text-blue-600`
                    } flex items-center mr-3 text-xl hover:opacity-50 transition-all duration-300 ease-linear`}
                  >
                    <AiFillLike />
                    <span className="ml-1 text-sm">{countLiked}</span>
                  </button>
                  <button
                    onClick={() => setUpLike(id, "dislike", "like")}
                    className={`${
                      disliked === 1 && `text-blue-600`
                    } flex items-center mr-3 text-xl hover:opacity-50 transition-all duration-300 ease-linear`}
                  >
                    <AiFillDislike />
                    <span className="ml-1 text-sm">{countDisLiked}</span>
                  </button>
                  <button
                    onClick={() => handleShowSettingMoblie(id)}
                    className={`smm:hidden p-1 overflow-hidden rounded-full hover:bg-gray-300  dark:hover:bg-gray-500/[0.4]`}
                  >
                    <BsThreeDots />
                  </button>
                </div>
              </div>
              <div className="smm:group-hover:block hidden ml-2 relative">
                <button
                  onClick={() => handleShowSetting(id)}
                  className="p-1 overflow-hidden rounded-full hover:bg-gray-300  dark:hover:bg-gray-500/[0.4]"
                >
                  <BsThreeDots />
                </button>
                {id === settingId && (
                  <div
                    ref={settingRef}
                    className="absolute top-full left-0 z-50"
                  >
                    <ul className="smm:min-w-[300px] bg-gray-200 dark:bg-gray-900 py-2 px-3 rounded-md">
                      <li
                        className="px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleGetDetail(sentBy)}
                      >
                        Chi tiết
                      </li>
                      {user !== null && user?.uid !== sentBy && (
                        <li
                          className="px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => handleHideComment(id)}
                        >
                          {checkHided ? "Hiện đánh giá" : "Ẩn đánh giá"}
                        </li>
                      )}
                      {user?.uid === sentBy && (
                        <>
                          <li
                            className="px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                              dispatch(actions.setShowModal(true));
                              setSettingId(false);
                              setDeleteId(id);
                            }}
                          >
                            Xóa đánh giá
                          </li>
                          <li
                            className="px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                              setUpdateId(id);
                              setUpdateValue(comment);
                            }}
                          >
                            Sửa đánh giá
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              {showModal && settingIdMobile && id === settingIdMobile && (
                <Modal
                  bg={"bg-gray-200 dark:bg-gray-900"}
                  pd="p-2"
                  colorBtn="dark:text-white text-gray-800"
                >
                  <ul className="w-[300px] rounded-md">
                    <li
                      className="px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleGetDetail(sentBy)}
                    >
                      Chi tiết
                    </li>
                    {user !== null && user?.uid !== sentBy && (
                      <li
                        className="px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleHideComment(id)}
                      >
                        {checkHided ? "Hiện đánh giá" : "Ẩn đánh giá"}
                      </li>
                    )}
                    {user?.uid === sentBy && (
                      <>
                        <li
                          className="px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            dispatch(actions.setShowModal(true));
                            setDeleteId(id);
                            setSettingIdMobile(false);
                          }}
                        >
                          Xóa đánh giá
                        </li>
                        <li
                          className="px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            setUpdateId(id);
                            setUpdateValue(comment);
                            closeModal();
                          }}
                        >
                          Sửa đánh giá
                        </li>
                      </>
                    )}
                  </ul>
                </Modal>
              )}
            </li>
          );
        })}
      </ul>
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
