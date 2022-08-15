import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Logo({
  bgHeaderActive = false,
  mobile = false,
  white = false,
}) {
  const theme = useSelector((state) => state.root.theme);
  const bgHeader = useSelector((state) => state.root.bgHeader);
  const zeroBgHeader = useSelector((state) => state.root.zeroBgHeader);

  const [logo, setLogo] = useState(null);

  useEffect(() => {
    if (theme === "dark" && bgHeader && !zeroBgHeader && !white) {
      setLogo("/iconWhite.png");
    }
    if (theme !== "dark" && bgHeader && !zeroBgHeader && !white) {
      setLogo("/icon.png");
    }
    if (theme === "dark" && zeroBgHeader) {
      setLogo("/iconWhite.png");
    }
    if (theme !== "dark" && zeroBgHeader && !bgHeaderActive) {
      setLogo("/icon.png");
    }
    if (theme !== "dark" && zeroBgHeader && bgHeaderActive && bgHeader) {
      setLogo("/icon.png");
    }
    if (theme !== "dark" && zeroBgHeader && bgHeaderActive && !bgHeader) {
      setLogo("/iconWhite.png");
    }
    if (bgHeaderActive && !bgHeader && !zeroBgHeader && !white) {
      setLogo("/iconWhite.png");
    }
    if (white && !zeroBgHeader) {
      setLogo("/iconWhite.png");
    }
  }, [theme, bgHeaderActive, white, mobile, bgHeader, zeroBgHeader]);

  return (
    <Link to={"/"} className="flex items-center cursor-pointer ">
      <img src={logo} alt="" className="w-10 h-10 object-cover" />
      <span
        className={`${white ? `text-white` : `text-gray-800 dark:text-white`} ${
          mobile ? "hidden smm2:block" : ""
        } text-xl font-bold font-sans  lg:block md:hidden`}
      >
        ChillTime
      </span>
    </Link>
  );
}
