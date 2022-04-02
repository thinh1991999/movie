const initState = {
  showTrailerModal: {
    show: false,
    key: "",
  },
};

export const DetailReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_SHOW_TRAILER_MODAL": {
      return {
        ...state,
        showTrailerModal: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
