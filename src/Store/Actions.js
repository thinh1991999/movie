// ROOT REDUCER

export const setTheme = (payload) => {
  return {
    type: "SET_THEME",
    payload,
  };
};

export const setLanguage = (payload) => {
  return {
    type: "SET_LANGUAGE",
    payload,
  };
};

export const setShowNavMobile = (payload) => {
  return {
    type: "SET_SHOW_NAV_MOBILE",
    payload,
  };
};

export const setShowSearchMobile = (payload) => {
  return {
    type: "SET_SHOW_SEARCH_MOBILE",
    payload,
  };
};

export const setShowModal = (payload) => {
  return {
    type: "SET_SHOW_MODAL",
    payload,
  };
};

export const setBgHeader = (payload) => {
  return {
    type: "SET_BG_HEADER",
    payload,
  };
};

export const setZeroBgHeader = (payload) => {
  return {
    type: "SET_ZERO_BG_HEADER",
    payload,
  };
};

export const setRouterHistory = (payload) => {
  return {
    type: "SET_ROUTER_HISTORY",
    payload,
  };
};

export const setCurrentRouter = (payload) => {
  return {
    type: "SET_CURRENT_ROUTER",
    payload,
  };
};

// HOME REDUCER

export const setTrending = (payload) => {
  return {
    type: "SET_TRENDING",
    payload,
  };
};

export const setOptions = (payload) => {
  return {
    type: "SET_OPTIONS",
    payload,
  };
};

export const setPopular = (payload) => {
  return {
    type: "SET_POPULAR",
    payload,
  };
};

export const setTopRated = (payload) => {
  return {
    type: "SET_TOP_RATED",
    payload,
  };
};

// Detail Reducer

export const setShowTrailerModal = (payload) => {
  return {
    type: "SET_SHOW_TRAILER_MODAL",
    payload,
  };
};

// ExploreReducer

export const setSearchExplore = (payload) => {
  return {
    type: "SET_SEARCH_EXPLORE",
    payload,
  };
};

export const setResetExplore = (payload) => {
  return {
    type: "SET_RESET_EXPLORE",
    payload,
  };
};

export const setTypeExplore = (payload) => {
  return {
    type: "SET_TYPE_EXPLORE",
    payload,
  };
};

export const setGenreExplore = (payload) => {
  return {
    type: "SET_GENRE_EXPLORE",
    payload,
  };
};

export const resetExplore = (payload) => {
  return {
    type: "RESET_EXPLORE",
    payload,
  };
};

// User reducer
export const setUser = (payload) => {
  return {
    type: "SET_USER",
    payload,
  };
};

export const setUserInfo = (payload) => {
  return {
    type: "SET_USER_INFO",
    payload,
  };
};

export const setPathNameLogin = (payload) => {
  return {
    type: "SET_PATH_NAME_LOGIN",
    payload,
  };
};

export const setLoginCreateAcc = (payload) => {
  return {
    type: "SET_LOGIN_CREATE_ACC",
    payload,
  };
};
