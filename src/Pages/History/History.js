import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function History() {
  const language = useSelector((state) => state.root.language);

  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    document.title = language.history;
  }, [language]);

  return (
    <div className="h-screen pt-16 pb-20 px-5 w-full overflow-y-scroll scroll-list dark:text-white">
      <h5 className="text-2xl font-medium">Lịch sử xem phim</h5>
      <div className="mt-5">
        <p>Chưa có lịch sử xem phim</p>
      </div>
    </div>
  );
}
