const initState = {
  reset: false,
  search: {
    with_genres: "",
    with_original_language: "",
    "vote_average.gte": 0,
    "vote_average.lte": 10,
    "vote_count.gte": 0,
  },
};

export const ExploreReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_SEARCH_EXPLORE": {
      return {
        ...state,
        search: payload,
      };
    }
    case "SET_RESET_EXPLORE": {
      return {
        ...state,
        reset: payload,
      };
    }
    case "RESET_EXPLORE": {
      return {
        ...state,
        search: {
          with_genres: "",
          with_original_language: "",
          "vote_average.gte": 0,
          "vote_average.lte": 10,
          "vote_count.gte": 0,
        },
      };
    }
    default:
      return {
        ...state,
      };
  }
};
