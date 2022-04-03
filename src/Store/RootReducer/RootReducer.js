import { English, VietNam } from "../../Lanuages";

const getLanguage = () => {
  const localLanguage = localStorage.getItem("language");
  if (localLanguage === "EN") {
    return English;
  } else {
    return VietNam;
  }
};

const initState = {
  language: getLanguage(),
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
