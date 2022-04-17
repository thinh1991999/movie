import { getLanguage, localStorageServ } from "../../Shared";

const initState = {
  language: getLanguage(localStorageServ.languageTheme.get()),
  theme: localStorageServ.modeTheme.get(),
  showNavMobile: false,
  bgHeader: false,
  showModal: false,
};

export const RootReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_THEME": {
      localStorageServ.modeTheme.set(payload);
      return {
        ...state,
        theme: payload,
      };
    }
    case "SET_LANGUAGE": {
      localStorageServ.languageTheme.set(payload);
      return {
        ...state,
        language: getLanguage(payload),
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
