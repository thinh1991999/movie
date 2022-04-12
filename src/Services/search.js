import { axios } from "../Shared";

export const getDataSearch = async (query, page, type) => {
  return await axios.get(`/search/${type}`, {
    params: {
      language: "en-US",
      page,
      query,
    },
  });
};
