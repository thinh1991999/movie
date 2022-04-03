import { axios } from "../Shared";

export const getPopular = async (type, page) => {
  const data = await axios
    .get(`/${type}/popular`, {
      params: {
        language: "en-US",
        page,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
  return {
    mode: "popular",
    data,
    type,
  };
};

export const getTopRated = async (type, page) => {
  const data = await axios
    .get(`/${type}/top_rated`, {
      params: {
        language: "en-US",
        page,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
  return {
    mode: "topRated",
    data,
    type,
  };
};

export const getNowPlaying = async (type, page) => {
  const data = await axios
    .get(`/movie/now_playing`, {
      params: {
        language: "en-US",
        page,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
  return {
    type: "movie",
    data,
  };
};

export const getupcoming = async (type, page) => {
  const data = await axios
    .get(`/movie/upcoming`, {
      params: {
        language: "en-US",
        page,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
  return {
    type: "movie",
    data,
  };
};

export const getTvAiringToday = async (type, page) => {
  const data = await axios
    .get(`/tv/airing_today`, {
      params: {
        language: "en-US",
        page,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
  return {
    type: "tv",
    data,
  };
};

export const getTvOnTheAir = async (type, page) => {
  const data = await axios
    .get(`/tv/on_the_air`, {
      params: {
        language: "en-US",
        page,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
  return {
    type: "tv",
    data,
  };
};

export const getGenres = async (type) => {
  const data = await axios
    .get(`/genre/${type}/list`, {
      params: {
        language: "en-US",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
  return data;
};

export const getLanguages = async (type) => {
  const data = await axios
    .get(`/configuration/languages`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
  return data;
};

export const getDiscover = async (type, searchInfo = {}, page = 1) => {
  const data = await axios
    .get(`/discover/${type}`, {
      params: {
        language: "en-US",
        ...searchInfo,
        page,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
  return data;
};
