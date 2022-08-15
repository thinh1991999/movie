import React, { useCallback, useEffect, useState } from "react";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { CircleLoading, Items } from "../../Components";
import httpService from "../../Services/http.service";
import { actions } from "../../Store";
import "./Actors.css";

export default function Actors() {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.root.language);

  const [actorsData, setActorsData] = useState(null);
  const [offset, setOffset] = useState(1);
  const [pageCount, setPageCount] = useState(50);
  const [loading, setLoading] = useState(true);
  const [pageRange, setPageRange] = useState(5);
  const [marginRange, setMarginRange] = useState(5);

  const handlePageClick = (e) => {
    setOffset(e.selected + 1);
  };

  const handleResize = useCallback(
    (size) => {
      if (size >= 768) {
        setPageRange(5);
        setMarginRange(5);
        return;
      }
      if (size >= 460) {
        setPageRange(2);
        setMarginRange(2);
        return;
      }
      setPageRange(1);
      setMarginRange(1);
    },
    [pageRange, marginRange]
  );

  useEffect(() => {
    setLoading(true);
    httpService
      .getActor(offset)
      .then((res) => res.data)
      .then((res) => {
        offset === 1 && setPageCount(res.total_pages);
        setActorsData(res.results);
        setLoading(false);
      });
  }, [offset]);

  useEffect(() => {
    document.title = language.popularPeople;
  }, [language]);

  useEffect(() => {
    const eventResize = (e) => {
      handleResize(e.target.innerWidth);
    };
    window.addEventListener("resize", eventResize);
    return () => {
      window.removeEventListener("resize", eventResize);
    };
  }, [pageRange, marginRange]);

  useEffect(() => {
    handleResize(window.innerWidth);
    dispatch(actions.setBgHeader(true));
  }, []);

  return (
    <div id="actors" className="px-5 h-full w-full text-white">
      <>
        <div className="h-full flex flex-col ">
          {loading ? (
            <div className="flex-1 flex justify-center items-center">
              <CircleLoading />
            </div>
          ) : (
            <>
              <Items items={actorsData} />
              <div className="flex items-center justify-center text-gray-800 dark:text-white">
                {offset > 1 ? (
                  <button onClick={() => setOffset(1)}>
                    <AiOutlineDoubleLeft className="text-xl" />
                  </button>
                ) : (
                  <button className="opacity-50 cursor-not-allowed">
                    <AiOutlineDoubleLeft className="text-xl" />
                  </button>
                )}
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={<AiOutlineRight className="text-xl" />}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={pageRange}
                  marginPagesDisplayed={marginRange}
                  pageCount={pageCount}
                  previousLabel={<AiOutlineLeft className="text-xl" />}
                  renderOnZeroPageCount={null}
                  forcePage={offset - 1}
                  activeClassName="active"
                />
                {offset < 500 ? (
                  <button onClick={() => setOffset(pageCount)}>
                    <AiOutlineDoubleRight className="text-xl" />
                  </button>
                ) : (
                  <button className="opacity-50 cursor-not-allowed">
                    <AiOutlineDoubleRight className="text-xl" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
}
