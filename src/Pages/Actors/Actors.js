import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { CircleLoading, Items } from "../../Components";
import httpService from "../../Services/http.service";
import "./Actors.css";

export default function Actors() {
  const language = useSelector((state) => state.root.language);

  const [actorsData, setActorsData] = useState(null);
  const [offset, setOffset] = useState(1);
  const [pageCount, setPageCount] = useState(50);
  const [loading, setLoading] = useState(true);

  const handlePageClick = (e) => {
    setOffset(e.selected + 1);
  };

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

  return (
    <div
      id="actors"
      className="h-screen pt-16  px-5 w-full overflow-y-scroll scroll-list text-white"
    >
      <>
        <div className="h-full flex flex-col ">
          {loading ? (
            <div className="flex-1 flex justify-center items-center">
              <CircleLoading />
            </div>
          ) : (
            <Items items={actorsData} />
          )}
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            activeClassName="active"
          />
        </div>
      </>
    </div>
  );
}
