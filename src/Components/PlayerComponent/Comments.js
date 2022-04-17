import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineSend, AiFillLike, AiFillDislike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { db, unKnowUserUrl } from "../../Shared";
import { actions } from "../../Store";
import { onValue, ref, push, child, update } from "firebase/database";

function Comments({ id }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const language = useSelector((state) => state.root.language);
  const location = useLocation();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState({
    comment: "",
  });

  const handleFowardToLogin = () => {
    dispatch(actions.setPathNameLogin(location.pathname));
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentValue.comment.trim().length > 0) {
      const newCommentKey = push(child(ref(db), "comments" + id)).key;
      const updates = {};
      updates["/comments/" + id + "/" + newCommentKey] = commentValue;
      update(ref(db), updates);
    }
  };

  useEffect(() => {
    const commentsRef = ref(db, "comments/" + id);
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setComments(Object.values(data));
      }
    });
  }, [id]);

  return (
    <div className="w-full text-gray-800 dark:text-white mt-10">
      <h5 className="text-2xl capitalize">
        {language.playerComments}: {comments.length}
      </h5>
      <div className=" py-2 px-4 border-2 border-gray-600 dark:border-gray-200 rounded-full mt-5">
        {user && (
          <form action="" onSubmit={handleSubmit}>
            <div className="flex items-center">
              <img
                src={user?.photoUrl || unKnowUserUrl}
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
        <ul className="mt-5">
          {comments.map((item, index) => {
            return (
              <li key={index} className="flex items-center">
                <div className="h-[50px] mr-2 w-[50px] rounded-full overflow-hidden">
                  <img src={item?.photoUrl || unKnowUserUrl} alt="" />
                </div>
                <div className="">
                  <h3>
                    Lorem ipsum dolor sit amet.{" "}
                    <span className="text-sm font-thin ml-1 text-gray-300">
                      2022/18/04
                    </span>
                  </h3>
                  <p>{item.comment}</p>
                  <div className="flex">
                    <button className="flex items-center mr-3 text-xl hover:opacity-50 transition-all duration-300 ease-linear">
                      <AiFillLike />
                      <span className="ml-1">0</span>
                    </button>
                    <button className="flex items-center text-xl hover:opacity-50 transition-all duration-300 ease-linear">
                      <AiFillDislike />
                      <span className="ml-1">0</span>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Comments;
