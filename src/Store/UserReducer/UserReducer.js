const initState = {
  user: null,
  userInfo: null,
  pathNameLogin: "",
  loginCreateAcc: false,
};

export const UserReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_USER": {
      return {
        ...state,
        user: payload,
      };
    }
    case "SET_USER_INFO": {
      return {
        ...state,
        userInfo: payload,
      };
    }
    case "SET_PATH_NAME_LOGIN": {
      return {
        ...state,
        pathNameLogin: payload,
      };
    }
    case "SET_LOGIN_CREATE_ACC": {
      return {
        ...state,
        loginCreateAcc: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
