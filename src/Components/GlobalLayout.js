import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { actions } from "../Store";
import ButtonScrollTop from "./ButtonScrollTop";
import Header from "./Header";
import SideBar from "./SideBar";

export default function GlobalLayout({ children }) {
  const location = useLocation();

  const dispatch = useDispatch();
  const bgHeader = useSelector((state) => state.root.bgHeader);

  const mainRef = useRef(null);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScrollTop = () => {
    mainRef.current.scrollTop = 0;
  };

  const handleSetShowScroll = useCallback((value) => {
    if (value >= 800) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }, []);
  useEffect(() => {
    let localMainRef = null;
    const handleScroll = (e) => {
      const value = e.target.scrollTop;
      handleSetShowScroll(value);
      if (bgHeader && value === 0) {
        dispatch(actions.setBgHeader(false));
      }
      if (!bgHeader && value > 0) {
        dispatch(actions.setBgHeader(true));
      }
    };
    if (mainRef.current) {
      localMainRef = mainRef.current;
      handleSetShowScroll(localMainRef.scrollTop);
      localMainRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      localMainRef.removeEventListener("scroll", handleScroll);
    };
  }, [bgHeader, dispatch, handleSetShowScroll]);

  useEffect(() => {
    let localMainRef = null;
    if (mainRef.current) {
      localMainRef = mainRef.current;
      localMainRef.scrollTop = 0;
    }
  }, [location]);

  return (
    <>
      <div
        className={` flex justify-end  flex-auto flex-shrink-0 antialiased bg-gray-50 dark:bg-gray-800 text-gray-800 `}
      >
        <SideBar />
        <Header />
        <div
          ref={mainRef}
          className={`lg:w-5/6 w-full md:w-[calc(100%_-_100%/16)] bg-gray-50 dark:bg-gray-800 h-screen pt-16 overflow-y-auto  scroll-smooth scroll-list`}
        >
          {children}
          {showScrollTop && (
            <button
              className="absolute bottom-5 right-5 text-black z-50 hover:opacity-50"
              onClick={handleScrollTop}
            >
              <ButtonScrollTop />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
