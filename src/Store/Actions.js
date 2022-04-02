// ROOT REDUCER

export const setTheme = (payload) => {
  return {
    type: "SET_THEME",
    payload,
  };
};

export const setShowNavMobile = (payload) => {
  return {
    type: "SET_SHOW_NAV_MOBILE",
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
