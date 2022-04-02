import { axios } from "../Shared";

export const getWeekTrending = async () => {
  const data = await axios
    .get("trending/all/week")
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });
  return {
    type: "TRENDING",
    ...data,
  };
};

export const getTodayTrending = async () => {
  const data = await axios
    .get("trending/all/day")
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });
  return {
    type: "TRENDING",
    ...data,
  };
};
