import { localStorageServ } from "../../Shared";

const initState = {
  user: localStorageServ.userInfo.get(),
  pathNameLogin: "",
};

export const UserReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_USER": {
      localStorageServ.userInfo.set(payload);
      return {
        ...state,
        user: payload,
      };
    }
    case "SET_PATH_NAME_LOGIN": {
      return {
        ...state,
        pathNameLogin: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
