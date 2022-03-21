import React, { useEffect, useState } from "react";
import { axios } from "../../Shared";
import { BannerSlider } from "../../Components";

function Home() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const getHome = async (page = 0) => {
    await axios
      .get("homePage/getHome", {
        params: {
          page,
        },
      })
      .then((data) => {
        console.log(data);
      });
  };
  const getTopSearch = async () => {
    await axios.get("search/v1/searchLeaderboard").then((data) => {
      console.log(data);
    });
  };

  const changeTheme = () => {
    if (theme === "light") {
      localStorage.theme = "dark";
      setTheme("dark");
    } else {
      localStorage.theme = "light";
      setTheme("light");
    }
  };
  useEffect(() => {
    Promise.all([getHome(), getTopSearch()]);
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="w-[80%] px-5 py-5">
        <BannerSlider />
      </div>
      <div className="w-[20%]"></div>
    </div>
  );
}

export default Home;
