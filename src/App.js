import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages";
import { Header, SideBar } from "./Components";
import { useSelector } from "react-redux";

function App() {
  const { theme } = useSelector((state) => state.root);

  return (
    <div
      className={`min-h-screen flex justify-end  flex-auto flex-shrink-0 antialiased bg-gray-50  text-gray-800 ${theme}`}
    >
      <SideBar />
      <Header />
      <div className="w-[calc(100%-16rem)] pt-16 dark:bg-gray-800">
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
