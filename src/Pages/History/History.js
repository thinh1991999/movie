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

  const setHistory = useCallback(() => {
    const key = user?.email || "unknowUser";
    const historyArr = localStorageServ.historyWatch.get()?.[key] || [];
    setHistoryData([...historyArr]);
  }, [user]);

  useEffect(() => {
    document.title = language.history;
  }, [language]);

  useEffect(() => {
    setHistory();
  }, [user, setHistory]);

  useEffect(() => {
    if (reset) {
      setHistory();
      setReset(false);
    }
  }, [reset, setHistory]);

  useEffect(() => {
    dispatch(actions.setBgHeader(true));
  }, [dispatch]);

  return (
    <div className="pb-20 px-5 w-full text-gray-800 dark:text-white">
      <div className="flex flex-wrap items-center mt-5">
        <h5 className="text-2xl font-medium">{language.watchHistory}</h5>
        {historyData.length > 0 && (
          <button className="smm2:-mt-5 ml-5" onClick={handleDeleteHistory}>
            <SubmitButton
              title={language.deleteHistory}
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
                <div className="w-full smm2:w-1/2 smm:w-1/3 mdd:w-1/4 lgg:w-1/6">
                  <Card data={item} type={"ALBUM"} />
                </div>
              );
            })}
          </div>
        ) : (
          <p>{language.noWatchHistory}</p>
        )}
      </div>
    </div>
  );
}
