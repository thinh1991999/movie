import sortBy from "lodash/sortBy";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import httpService from "../../Services/http.service";
import { actions } from "../../Store";
import { setGenreExplore, setTypeExplore } from "../../Store/Actions";
import SquareButton from "../SquareButton";
import ChooseRate from "./ChooseRate";
import SelectConfig from "./SelectConfig";

const HandleSearch = () => {
  const { genre, type } = useParams();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);
  const typeExplore = useSelector((state) => state.explore.type);
  const [genres, setGenres] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [navData, setNavData] = useState([
    {
      type: "tv",
      name: language.exploreTvTitle,
    },
    {
      type: "movie",
      name: language.exploreMovieTitle,
    },
  ]);
  const [mounted, setMounted] = useState(false);
  const getNavIndex = useMemo(() => {
    return navData.findIndex((item) => item.type === type);
  }, [type, navData]);
  const [navIndex, setNavIndex] = useState(
    navData.findIndex((item) => item.type === type) === -1 ? 0 : getNavIndex
  );

  const handleChangeNav = (index) => {
    setNavIndex(index);
    dispatch(setTypeExplore(navData[index].type));
  };

  const handleClearSearch = () => {
    dispatch(
      actions.setSearchExplore({
        with_genres: "",
        with_original_language: "",
        "vote_average.gte": 0,
        "vote_average.lte": 10,
        "vote_count.gte": 0,
      })
    );
    dispatch(actions.setResetExplore(true));
  };
  useEffect(() => {
    if (!mounted) return;
    setGenres(null);
    httpService.getGenres(typeExplore).then((res) => {
      setGenres({
        type: "with_genres",
        options: [
          {
            id: "",
            name: "all genres",
          },
          ...res.data.genres,
        ],
      });
    });
  }, [typeExplore, mounted]);
  useEffect(() => {
    httpService.getLanguages().then((res) => {
      const dataRes = res.data;
      const newArr = dataRes.map((item) => {
        const { iso_639_1, english_name } = item;
        return {
          id: iso_639_1,
          name: english_name,
        };
      });
      const newArrSorted = sortBy(newArr, [
        function (o) {
          return o.name;
        },
      ]);
      setLanguages({
        type: "with_original_language",
        options: [
          {
            id: "",
            name: "all Languages",
          },
          ...newArrSorted,
        ],
      });
    });
  }, []);
  useEffect(() => {
    setNavData([
      {
        type: "tv",
        name: language.exploreTvTitle,
      },
      {
        type: "movie",
        name: language.exploreMovieTitle,
      },
    ]);
    document.title = language.search;
  }, [language]);
  useEffect(() => {
    dispatch(setTypeExplore(type));
    dispatch(setGenreExplore(genre));
    setMounted(true);
  }, [type, dispatch, genre]);

  return (
    <div>
      <div className="w-full mb-8">
        <ul className="flex items-center md:justify-start justify-center">
          {navData.map((item, index) => {
            const { name } = item;
            return (
              <li
                key={index}
                className={`text-xl text-gray-800 dark:text-white py-1 mr-4 cursor-pointer capitalize  ${
                  index === navIndex
                    ? `text-blue-600 dark:text-blue-600 border-blue-600 border-b-2`
                    : ""
                } `}
                onClick={() => handleChangeNav(index)}
              >
                {name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center md:justify-start justify-center flex-wrap">
        <div className="md:m-0 my-2">
          <SelectConfig data={genres} />
        </div>
        <div className="md:m-0 my-2">
          <SelectConfig data={languages} />
        </div>
        <div className="md:m-0 my-4">
          <ChooseRate
            title={language.exploreScore}
            begin={"vote_average.gte"}
            end={"vote_average.lte"}
            number={10}
            hint={2}
            twoWay={true}
          />
        </div>
        <div className="md:m-0 my-4">
          <ChooseRate
            title={language.exploreMiniVote}
            begin={"vote_count.gte"}
            number={500}
            hint={5}
          />
        </div>
        <button className="mt-2" onClick={handleClearSearch}>
          <SquareButton
            msg={language.exploreResetBtn}
            bg="bg-red-600"
            color="text-white"
          ></SquareButton>
        </button>
      </div>
    </div>
  );
};

export default HandleSearch;
