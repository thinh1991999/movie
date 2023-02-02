const initState = {
  reset: false,
  search: {
    with_genres: "",
    with_original_language: "",
    "vote_average.gte": 0,
    "vote_average.lte": 10,
    "vote_count.gte": 0,
  },
  type: "tv",
};

export const ExploreReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_SEARCH_EXPLORE": {
      const search = state.search;
      return {
        ...state,
        search: {
          ...search,
          ...payload,
        },
      };
    }
    case "SET_RESET_EXPLORE": {
      return {
        ...state,
        reset: payload,
      };
    }
    case "SET_TYPE_EXPLORE": {
      const search = state.search;
      return {
        ...state,
        type: payload ? payload : "tv",
        search: {
          ...search,
          with_genres: "",
        },
      };
    }
    case "SET_GENRE_EXPLORE": {
      const search = state.search;
      return {
        ...state,
        search: {
          ...search,
          with_genres: payload !== undefined ? payload * 1 : "",
        },
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
