import { axios } from "../Shared";

export const getDetail = async (id, type) => {
  const data = await axios
    .get(`/${type}/${id}`, {
      params: {
        language: "en-US",
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

export const getSmilar = async (id, type, page = 1) => {
  const data = await axios
    .get(`/${type}/${id}/similar`, {
      params: {
        language: "en-US",
        page,
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

export const getVideos = async (movie_id, type) => {
  const data = await axios
    .get(`/${type}/${movie_id}/videos`, {
      params: {
        language: "en-US",
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

export const getCredits = async (id, type) => {
  const data = await axios
    .get(`/${type}/${id}/credits`, {
      params: {
        language: "en-US",
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
