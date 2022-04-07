import { axios } from "../Shared";

export const getMutilSearch = async (query, page) => {
  const data = await axios
    .get(`/search/multi`, {
      params: {
        language: "en-US",
        page,
        query,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return null;
    });
  return data;
};
