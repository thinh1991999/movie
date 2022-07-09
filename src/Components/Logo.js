import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Logo({ white = false }) {
  const theme = useSelector((state) => state.root.theme);

  return (
    <Link to={"/"} className="flex items-center cursor-pointer ">
      {theme === "dark" || white ? (
        <img src="/iconWhite.png" alt="" className="w-10 h-10 object-cover" />
      ) : (
        <img src="/icon.png" alt="" className="w-10 h-10 object-cover" />
      )}
      <span
        className={`${
          white ? `text-white` : `text-gray-800 dark:text-white`
        }  text-xl font-bold font-sans  lg:block md:hidden`}
      >
        ChillTime
      </span>
    </Link>
  );
}
