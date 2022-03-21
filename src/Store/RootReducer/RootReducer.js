import { English } from "../../Lanuages";
const initState = {
  language: English,
  theme: "",
};

export const RootReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_THEME": {
      return {
        ...state,
        theme: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
