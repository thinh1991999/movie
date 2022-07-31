import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, SubmitButton } from "../../Components";
import { localStorageServ } from "../../Shared";
import { actions } from "../../Store";

export default function History() {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.root.language);
  const user = useSelector((state) => state.user.user);

  const [historyData, setHistoryData] = useState([]);
  const [reset, setReset] = useState(false);

  const handleDeleteHistory = useCallback(() => {
    const key = user?.email || "unknowUser";
    const history = localStorageServ.historyWatch.get();
    delete history?.[key];
    localStorageServ.historyWatch.set(history);
    setReset(true);
  }, [user]);

  const setHistory = () => {
    const key = user?.email || "unknowUser";
    const historyArr = localStorageServ.historyWatch.get()?.[key] || [];
    setHistoryData([...historyArr]);
  };

  useEffect(() => {
    document.title = language.history;
  }, [language]);

  useEffect(() => {
    setHistory();
  }, [user]);

  useEffect(() => {
    if (reset) {
      setHistory();
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    dispatch(actions.setBgHeader(true));
  }, []);

  return (
    <div className="h-screen pt-16 pb-20 px-5 w-full overflow-y-scroll scroll-list dark:text-white">
      <div className="flex items-center mt-5">
        <h5 className="text-2xl font-medium">Lịch sử xem phim</h5>
        {historyData.length > 0 && (
          <button className="-mt-5 ml-5" onClick={handleDeleteHistory}>
            <SubmitButton
              title="Xóa lịch sử"
              loading={false}
              label={true}
            ></SubmitButton>
          </button>
        )}
      </div>
      <div className="mt-5">
        {historyData.length > 0 ? (
          <div className="flex flex-row flex-wrap">
            {historyData.map((item) => {
              return (
                <div className="mdd:w-1/4 lgg:w-1/6">
                  <Card data={item} type={"ALBUM"} />
                </div>
              );
            })}
          </div>
        ) : (
          <p>Bạn chưa có lịch sử xem phim</p>
        )}
      </div>
    </div>
  );
}
