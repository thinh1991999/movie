import { useCallback, useEffect, useMemo, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { onValue, ref, push, child, update } from "firebase/database";
import { Timestamp } from "firebase/firestore";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import _ from "lodash";
import { db, unKnowUserUrl } from "../../Shared";
import { actions } from "../../Store";
import CommentList from "./CommentList";
import { BsEmojiSmile } from "react-icons/bs";
import { useRef } from "react";

function Comments({ id }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userInfo = useSelector((state) => state.user.userInfo);
  const language = useSelector((state) => state.root.language);
  const theme = useSelector((state) => state.root.theme);

  const location = useLocation();
  const navigate = useNavigate();

  const commentRef = useRef(null);
  const emoijRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [infoUsers, setInfoUsers] = useState({});
  const [showEmoji, setShowEmoji] = useState(false);
  const [perLine, setPerLine] = useState(9);

  const handleFowardToLogin = () => {
    dispatch(actions.setPathNameLogin(location.pathname));
    navigate("/authen/signIn");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentValue.trim().length > 0) {
      const values = {
        sentBy: user.uid,
        comment: commentValue.trim(),
        created: Timestamp.fromDate(new Date()).seconds,
      };
      const newCommentKey = push(child(ref(db), "comments" + id)).key;
      const updates = {};
      updates["/comments/" + id + "/" + newCommentKey] = values;
      update(ref(db), updates);
      setCommentValue("");
    }
  };

  const onEmojiSelect = (e) => {
    if (commentValue.length > 198) return;
    const cursor = commentRef.current.selectionStart;
    const text =
      commentValue.slice(0, cursor) + e.native + commentValue.slice(cursor);
    setCommentValue(text);
    commentRef.current.focus();
    commentRef.current.selectionStart = cursor + 2;
    commentRef.current.selectionEnd = cursor + 2;
  };

  const setPerLineEmoji = useCallback((size) => {
    if (size <= 400) {
      setPerLine(7);
    } else {
      setPerLine(9);
    }
  }, []);

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

  useEffect(() => {
    const clickEvent = (e) => {
      if (!emoijRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    };
    const resizeEvent = (e) => {
      setPerLineEmoji(e.target.innerWidth);
    };
    if (showEmoji) {
      window.addEventListener("click", clickEvent);
      window.addEventListener("resize", resizeEvent);
    }
    return () => {
      window.removeEventListener("click", clickEvent);
      window.addEventListener("resize", resizeEvent);
    };
  }, [showEmoji, setPerLineEmoji]);

  useEffect(() => {
    setPerLineEmoji(window.innerWidth);
  }, [setPerLineEmoji]);

  return (
    <div className="w-full text-gray-800 dark:text-white mt-10">
      <h5 className="text-2xl capitalize">
        {language.playerComments}: {comments.length}
      </h5>
      <div className="">
        {user && userInfo && (
          <>
            <div className="flex justify-end my-2">
              <span className="text-sm">{commentValue.length}/200</span>
            </div>
            <form
              action=""
              onSubmit={handleSubmit}
              className="py-2 px-4 border-2 border-gray-600 dark:border-gray-200 rounded-full"
            >
              <div className="flex items-center">
                <img
                  src={userInfo?.avatar || unKnowUserUrl}
                  alt=""
                  className="h-[30px] w-[30px] bg-white rounded-full mr-2"
                />
                <input
                  ref={commentRef}
                  type="text"
                  placeholder="Your comment..."
                  className="w-full bg-transparent outline-none"
                  value={commentValue}
                  onChange={(e) => {
                    e.target.value.length <= 200 &&
                      setCommentValue(e.target.value);
                  }}
                />
                <div className="flex justify-center items-center mx-2 relative">
                  <button
                    type="button"
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="text-3xl hover:opacity-50"
                  >
                    <BsEmojiSmile />
                  </button>
                  {showEmoji && (
                    <div
                      ref={emoijRef}
                      className="absolute bottom-full md:right-0 right-[-70px]"
                    >
                      <Picker
                        data={data}
                        onEmojiSelect={(e) => onEmojiSelect(e)}
                        theme={theme}
                        emojiSize={24}
                        perLine={perLine}
                      />
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  className="text-3xl hover:opacity-50"
                >
                  <AiOutlineSend />
                </button>
              </div>
            </form>
          </>
        )}
        {!user && (
          <div className="mt-5 w-full items-center flex py-2 px-4 border-2 border-gray-600 dark:border-gray-200 rounded-full">
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
