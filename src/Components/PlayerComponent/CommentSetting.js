import { child, get, ref, remove, update } from "firebase/database";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../../Shared";
import { actions } from "../../Store";

export default function CommentItem({
  item,
  checkHided,
  idPlayer,
  setDetailUser,
  setDeleteId,
  setUpdateId,
  setSettingId,
}) {
  const {
    id,
    data: { sentBy },
  } = item;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleHideComment = () => {
    const path = "/comments/" + idPlayer + "/" + id + "/hides/";
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
  const handleGetDetail = (sentBy) => {
    // setSettingIdMobile(false);
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

  return (
    <ul className="min-w-[300px] bg-gray-200 dark:bg-gray-900 py-2 px-3 rounded-md">
      <li
        className="px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
        onClick={() => handleGetDetail(sentBy)}
      >
        Chi tiết
      </li>
      {user !== null && user?.uid !== sentBy && (
        <li
          className="px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => handleHideComment()}
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
            }}
          >
            Xóa đánh giá
          </li>
          <li
            className="px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setUpdateId(id);
            }}
          >
            Sửa đánh giá
          </li>
        </>
      )}
    </ul>
  );
}
