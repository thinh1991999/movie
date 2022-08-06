import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { onValue, ref } from "firebase/database";
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
  Error,
} from "./Pages";
import { GlobalLayout, SearchMobile } from "./Components";
import { actions } from "./Store";
import { auth, db } from "./Shared";
import User from "./Pages/User/User";

function App() {
  const location = useLocation();
  const theme = useSelector((state) => state.root.theme);
  const showNavMobile = useSelector((state) => state.root.showNavMobile);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(actions.setUser(user));
        onValue(ref(db, "/users/" + user.uid), (snapshot) => {
          const data = snapshot.val();
          dispatch(actions.setUserInfo(data));
        });
      } else {
        dispatch(actions.setUser(null));
        dispatch(actions.setUserInfo(null));
        dispatch(actions.setLoginCreateAcc(false));
      }
    });
  }, []);

  useEffect(() => {
    dispatch(actions.setRouterHistory(location));
    dispatch(actions.setCurrentRouter(location.key));
  }, [location]);

  return (
    <div className={`w-full  ${theme}`}>
      <Routes>
        <Route
          index
          element={
            <GlobalLayout>
              <Home />
            </GlobalLayout>
          }
        ></Route>
        <Route
          path="/"
          element={
            <GlobalLayout>
              <Home />
            </GlobalLayout>
          }
        ></Route>
        <Route
          path="/explored"
          element={
            <GlobalLayout>
              <Explored />
            </GlobalLayout>
          }
        ></Route>
        <Route
          path="/explored/:genre/:type"
          element={
            <GlobalLayout>
              <Explored />
            </GlobalLayout>
          }
        ></Route>
        <Route
          path="/detail/:id/:type"
          element={
            <GlobalLayout>
              <Detail />
            </GlobalLayout>
          }
        ></Route>
        <Route
          path="/player/:id/:type"
          element={
            <GlobalLayout>
              <Player />
            </GlobalLayout>
          }
        ></Route>
        <Route
          path="/player/:id/:type/:session/:episode"
          element={
            <GlobalLayout>
              <Player />
            </GlobalLayout>
          }
        ></Route>
        <Route
          path="/people/:id"
          element={
            <GlobalLayout>
              <People />
            </GlobalLayout>
          }
        ></Route>
        <Route
          path="/search/"
          element={
            <GlobalLayout>
              <Search />
            </GlobalLayout>
          }
        ></Route>
        <Route
          path="/search/:value"
          element={
            <GlobalLayout>
              <Search />
            </GlobalLayout>
          }
        ></Route>
        <Route
          path="/actors"
          element={
            <GlobalLayout>
              <Actors />
            </GlobalLayout>
          }
        ></Route>
        <Route
          path="/history"
          element={
            <GlobalLayout>
              <History />
            </GlobalLayout>
          }
        ></Route>
        <Route
          path="/user"
          element={
            <GlobalLayout>
              <User />
            </GlobalLayout>
          }
        ></Route>
        <Route path="*" element={<Error notFound={true} />}></Route>
        <Route path="/error" element={<Error />}></Route>
        <Route path="/authen" element={<Authen />}></Route>
        <Route path="/authen/:status" element={<Authen />}></Route>
      </Routes>
      {showNavMobile && (
        <div
          className="fixed top-0 left-0 bottom-0 right-0 bg-black/[0.2] z-[11] "
          onClick={() => dispatch(actions.setShowNavMobile(false))}
        ></div>
      )}
      <SearchMobile />
      <ToastContainer />
    </div>
  );
}

export default App;
