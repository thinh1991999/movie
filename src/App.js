import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import {
  Detail,
  Explored,
  Home,
  Authen,
  People,
  Player,
  Search,
  Actors,
  History,
} from "./Pages";
import { Header, SideBar } from "./Components";
import { actions } from "./Store";
import { auth } from "./Shared";
import User from "./Pages/User/User";

function App() {
  const theme = useSelector((state) => state.root.theme);
  const showNavMobile = useSelector((state) => state.root.showNavMobile);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        console.log(false);
      }
    });
  }, []);

  return (
    <div className={`w-full ${theme}`}>
      <div
        className={` flex justify-end  flex-auto flex-shrink-0 antialiased bg-gray-50 dark:bg-gray-800 text-gray-800 `}
      >
        <SideBar />
        <Header />
        <div className="lg:w-5/6 w-full md:w-[calc(100%_-_100%/16)] bg-gray-50 dark:bg-gray-800">
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/explored" element={<Explored />}></Route>
            <Route path="/explored/:genre/:type" element={<Explored />}></Route>
            <Route path="/detail/:id/:type" element={<Detail />}></Route>
            <Route path="/player/:id/:type" element={<Player />}></Route>
            <Route
              path="/player/:id/:type/:session/:episode"
              element={<Player />}
            ></Route>
            <Route path="/people/:id" element={<People />}></Route>
            <Route path="/search/" element={<Search />}></Route>
            <Route path="/search/:value" element={<Search />}></Route>
            <Route path="/actors" element={<Actors />}></Route>
            <Route path="/history" element={<History />}></Route>
            <Route path="/user" element={<User />}></Route>
          </Routes>
        </div>

        {showNavMobile && (
          <div
            className="fixed top-0 left-0 bottom-0 right-0 bg-black/[0.2] z-[11] "
            onClick={() => dispatch(actions.setShowNavMobile(false))}
          ></div>
        )}
        <ToastContainer />
      </div>
      <Routes>
        <Route path="/authen" element={<Authen />}></Route>
        <Route path="/authen/:status" element={<Authen />}></Route>
      </Routes>
    </div>
  );
}

export default App;
