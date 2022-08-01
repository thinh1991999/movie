import { getLanguage, localStorageServ } from "../../Shared";

const initState = {
  language: getLanguage(localStorageServ.languageTheme.get()),
  theme: localStorageServ.modeTheme.get(),
  showNavMobile: false,
  bgHeader: false,
  showModal: false,
  routerHistory: [],
  currentRouter: null,
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
    case "SET_ROUTER_HISTORY": {
      const filterIdx = state.routerHistory.findIndex((item) => {
        return item.key === payload.key;
      });
      if (filterIdx !== -1) {
        return {
          ...state,
        };
      }
      const newRouterHistory = [...state.routerHistory, payload];
      return {
        ...state,
        routerHistory: newRouterHistory,
        currentRouter: payload.key,
      };
    }
    case "SET_CURRENT_ROUTER": {
      return {
        ...state,
        currentRouter: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
