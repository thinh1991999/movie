import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

function Comments() {
  const language = useSelector((state) => state.root.language);

  return (
    <div className="w-full text-gray-800 dark:text-white mt-10">
      <h5 className="text-2xl capitalize">{language.playerComments}</h5>
      <div className="w-full items-center flex py-2 px-4 border-2 border-gray-600 dark:border-gray-200 rounded-full mt-5">
        <div className="bg-gray-200 dark:bg-gray-400 text-3xl rounded-full mr-2">
          <FaRegUserCircle />
        </div>
        <p>
          {language.playerCommentsLeft}{" "}
          <button className="text-blue-600 capitalize">{language.login}</button>{" "}
          {language.playerCommentsRight}
        </p>
      </div>
    </div>
  );
}

export default Comments;
