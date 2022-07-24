import React, { useState } from "react";

export default function History() {
  const [historyData, setHistoryData] = useState([]);

  return (
    <div className="h-screen pt-16 pb-20 px-5 w-full overflow-y-scroll scroll-list dark:text-white">
      <h5 className="text-2xl font-medium">Lịch sử xem phim</h5>
      <div className="mt-5">
        <p>Chưa có lịch sử xem phim</p>
      </div>
    </div>
  );
}
