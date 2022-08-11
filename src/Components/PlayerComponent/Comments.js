import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { onValue, ref, push, child, update } from "firebase/database";
import { Timestamp } from "firebase/firestore";
import _ from "lodash";
import { db, unKnowUserUrl } from "../../Shared";
import { actions } from "../../Store";
import CommentList from "./CommentList";

function Comments({ id }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userInfo = useSelector((state) => state.user.userInfo);
  const language = useSelector((state) => state.root.language);
  const location = useLocation();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState({
    comment: "",
  });
  const [infoUsers, setInfoUsers] = useState({});

  const handleFowardToLogin = () => {
    dispatch(actions.setPathNameLogin(location.pathname));
    navigate("/authen/signIn");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentValue.comment.trim().length > 0) {
      const values = {
        sentBy: user.uid,
        comment: commentValue.comment,
        created: Timestamp.fromDate(new Date()).seconds,
      };
      const newCommentKey = push(child(ref(db), "comments" + id)).key;
      const updates = {};
      updates["/comments/" + id + "/" + newCommentKey] = values;
      update(ref(db), updates);
      setCommentValue({
        comment: "",
      });
    }
  };

  useEffect(() => {
    const commentsRef = ref(db, "comments/" + id);
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arrComments = [];
        _.forIn(data, function (value, key) {
          arrComments.push({
            id: key,
            data: value,
          });
        });
        arrComments.sort((a, b) => {
          if (a.data.created > b.data.created) {
            return -1;
          }
          if (a.data.created < b.data.created) {
            return 1;
          }
          return 0;
        });
        const inforsObject = {};
        arrComments.forEach((item) => {
          const {
            data: { sentBy },
          } = item;
          const userRef = ref(db, "users/" + sentBy);
          if (!inforsObject[sentBy]) {
            onValue(userRef, (snapshot) => {
              const data = snapshot.val();
              if (data) {
                inforsObject[sentBy] = data;
              }
            });
          }
        });
        setTimeout(() => {
          setComments(arrComments);
          setInfoUsers(inforsObject);
        }, 400);
      }
    });
  }, [id]);
  return (
    <div className="w-full text-gray-800 dark:text-white mt-10">
      <h5 className="text-2xl capitalize">
        {language.playerComments}: {comments.length}
      </h5>
      <div className=" py-2 px-4 border-2 border-gray-600 dark:border-gray-200 rounded-full mt-5">
        {user && userInfo && (
          <form action="" onSubmit={handleSubmit}>
            <div className="flex items-center">
              <img
                src={userInfo?.avatar || unKnowUserUrl}
                alt=""
                className="h-[30px] w-[30px] bg-white rounded-full mr-2"
              />
              <input
                type="text"
                placeholder="Your comment..."
                className="w-full bg-transparent outline-none"
                value={commentValue.comment}
                onChange={(e) =>
                  setCommentValue({
                    ...commentValue,
                    comment: e.target.value,
                  })
                }
              />
              <button
                type="submit"
                onSubmit={handleSubmit}
                className="text-3xl"
              >
                <AiOutlineSend />
              </button>
            </div>
          </form>
        )}
        {!user && (
          <div className="w-full items-center flex">
            <div className=" bg-gray-200 dark:bg-gray-400 text-3xl rounded-full mr-2">
              <FaRegUserCircle />
            </div>
            <p>
              {language.playerCommentsLeft}{" "}
              <button
                onClick={handleFowardToLogin}
                className="text-blue-600 capitalize hover:opacity-50"
              >
                {language.login}
              </button>{" "}
              {language.playerCommentsRight}
            </p>
          </div>
        )}
      </div>
      {comments.length > 0 && (
        <CommentList comments={comments} infoUsers={infoUsers} id={id} />
      )}
    </div>
  );
}

export default Comments;
