import { English } from "../../Lanuages";
const initState = {
  language: English,
  theme: localStorage.getItem("theme") || "",
  showNavMobile: false,
  bgHeader: false,
  showModal: false,
};

export const RootReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_THEME": {
      localStorage.setItem("theme", payload);
      return {
        ...state,
        theme: payload,
      };
    }
    case "SET_SHOW_NAV_MOBILE": {
      return {
        ...state,
        showNavMobile: payload,
      };
    }
    case "SET_SHOW_MODAL": {
      return {
        ...state,
        showModal: payload,
      };
    }
    case "SET_BG_HEADER": {
      return {
        ...state,
        bgHeader: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};