import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineSearch,
  AiFillStar,
  AiOutlineTags,
  AiOutlineClose,
} from "react-icons/ai";
import { getMutilSearch } from "../Services";
import { getImageUrl } from "../Shared";
import { BsFillPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const bgHeader = useSelector((state) => state.root.bgHeader);
  const language = useSelector((state) => state.root.language);

  const [searchValue, setSearchValue] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [dataSearch, setDataSearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const closeBtnRef = useRef(null);

  const handleForwardLink = (id, type) => {
    navigate(`detail/${id}/${type}`);
  };

  const handleClear = () => {
    setTimeout(() => {
      setSearchValue("");
      setSearchFocus(true);
      inputRef.current.focus();
    }, 110);
  };

  useEffect(() => {
    setLoading(true);
    const getSearchData = setTimeout(() => {
      getMutilSearch(searchValue, 1).then((res) => {
        setDataSearch(res);
        setLoading(false);
      });
    }, 200);
    return () => {
      clearTimeout(getSearchData);
      setLoading(true);
    };
  }, [searchValue]);

  useEffect(() => {
    let timeout;
    const eventBlur = (e) => {
      timeout = setTimeout(() => {
        setSearchFocus(false);
      }, 100);
    };
    inputRef.current.addEventListener("blur", eventBlur);
    return () => {
      inputRef.current.removeEventListener("blur", eventBlur);
      clearTimeout(timeout);
    };
  }, [searchFocus]);

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-600 ${
        !bgHeader && `bg-gray-200/[0.3] dark:bg-gray-200/[0.3]`
      } px-2 ml-4   ${
        searchFocus
          ? " from-violet-400 to-fuchsia-400 bg-gradient-to-r dark:from-violet-800 dark:to-fuchsia-800"
          : ""
      }  flex items-center relative ${
        searchFocus && searchValue ? `rounded-t-3xl` : `rounded-3xl`
      }`}
    >
      <button className={`${!bgHeader && `text-white`}`}>
        <Button size={"text-2xl"}>
          <AiOutlineSearch />
        </Button>
      </button>
      <input
        onFocus={() => setSearchFocus(true)}
        ref={inputRef}
        type="text"
        className={`px-2 flex-1  outline-none capitalize  ${
          !bgHeader
            ? `bg-transparent dark:bg-transparent text-white dark:text-white`
            : `bg-gray-200 dark:bg-gray-600 dark:text-gray-200`
        }
        ${
          searchFocus
            ? "from-violet-400 placeholder:text-gray-800 dark:placeholder:text-gray-300 to-fuchsia-400 bg-gradient-to-r dark:from-violet-800 dark:to-fuchsia-800"
            : ""
        }
        `}
        placeholder={language.headerSearch}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue.length > 0 ? (
        <button onClick={handleClear} ref={closeBtnRef}>
          <Button size={"text-md"}>
            <AiOutlineClose />
          </Button>
        </button>
      ) : (
        ""
      )}
      {searchFocus && searchValue && (
        <div className="absolute w-full rounded-b-[20px] max-h-[300px] overflow-y-auto scroll-list from-violet-400 to-fuchsia-400 bg-gradient-to-r dark:from-violet-800 dark:to-fuchsia-800 top-full left-0">
          <div className="max-h-[300px] overflow-y-auto scroll-list">
            {loading && searchValue ? (
              <h2 className="dark:text-white text-gray-800 text-center capitalize">
                {language.headerLoading}........
              </h2>
            ) : (
              <ul className="">
                {dataSearch?.results.length > 0 ? (
                  dataSearch?.results.map((item, index) => {
                    const {
                      name,
                      backdrop_path,
                      id,
                      title,
                      vote_average,
                      media_type,
                      profile_path,
                      poster_path,
                    } = item;
                    return (
                      <li
                        key={id || index}
                        className="px-4 py-2 cursor-pointer group hover:bg-slate-300/[0.5] dark:hover:bg-slate-300/[0.2] flex transition-all duration-300 ease-linear"
                        onClick={() => handleForwardLink(id, media_type)}
                      >
                        <div className="relative w-[75px] h-[50px] overflow-hidden rounded-md">
                          <img
                            src={getImageUrl(
                              backdrop_path || poster_path || profile_path,
                              "w300"
                            )}
                            alt=""
                            className="w-full h-full object-cover "
                          />
                          <div className="absolute group-hover:opacity-30 bg-black transition-all duration-300 ease-linear opacity-0 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                            <BsFillPlayFill />
                          </div>
                          <div className="absolute group-hover:opacity-100 opacity-0 transition-all duration-300 ease-linear text-white top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                            <BsFillPlayFill />
                          </div>
                        </div>
                        <div className="dark:text-white text-gray-900 ml-2 flex-1">
                          <p className="w-full sub-title group-hover:text-yellow-200 dark:group-hover:text-yellow-300 transition-all duration-300 ease-linear">
                            {name || title}
                          </p>
                          <p className="text-xs flex items-center capitalize">
                            {vote_average && (
                              <span className="flex items-center mr-2">
                                <AiFillStar className="text-yellow-300" />{" "}
                                {vote_average}
                              </span>
                            )}

                            <span className="flex items-center ">
                              <AiOutlineTags className="text-yellow-300" />
                              {media_type}
                            </span>
                          </p>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <h2 className="dark:text-white text-gray-800 text-center capitalize">
                    {language.headerNoResult}
                  </h2>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
