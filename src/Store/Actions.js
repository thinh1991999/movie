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
