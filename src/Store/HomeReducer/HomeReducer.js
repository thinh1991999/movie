const initState = {
  trending: "week",
  popular: "movie",
  topRated: "movie",
};

export const HomeReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_TRENDING": {
      return {
        ...state,
        trending: payload,
      };
    }
    case "SET_POPULAR": {
      return {
        ...state,
        trending: payload,
      };
    }
    case "SET_TOP_RATED": {
      return {
        ...state,
        topRated: payload,
      };
    }
    case "SET_OPTIONS": {
      console.log(payload);
      return {
        ...state,
        [payload.mode]: payload.value,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
