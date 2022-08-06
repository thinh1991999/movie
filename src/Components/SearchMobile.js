import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Store";
import Button from "./Button";
import Search from "./Search";

export default function SearchMobile() {
  const dispatch = useDispatch();
  const bgHeader = useSelector((state) => state.root.bgHeader);
  const showSearchMobile = useSelector((state) => state.root.showSearchMobile);

  return (
    <div
      className={`${
        showSearchMobile ? "translate-y-0" : "translate-y-full"
      }  fixed top-0 left-0 bottom-0 right-0 bg-gray-100 dark:bg-gray-800 z-50 text-white flex justify-center animation-global `}
    >
      <div className="py-5 w-[300px]">
        <div className="flex justify-start mb-5">
          <button onClick={() => dispatch(actions.setShowSearchMobile(false))}>
            <Button size={"text-2xl"} bg={true} header={bgHeader}>
              <AiOutlineDown className="text-gray-800 dark:text-white" />
            </Button>
          </button>
        </div>
        <h5 className="text-xl text-gray-800 dark:text-white">Tìm kiếm</h5>
        <div className="mt-5 w-full">
          <Search />
        </div>
      </div>
    </div>
  );
}
