import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { RootReducer } from "./RootReducer/RootReducer";
import { HomeReducer } from "./HomeReducer/HomeReducer";
import { DetailReducer } from "./DetailReducer/DetailReducer";
import { ExploreReducer } from "./ExploreReducer/ExploreReducer";

function AppProvider({ children }) {
  const store = createStore(
    combineReducers({
      root: RootReducer,
      home: HomeReducer,
      detail: DetailReducer,
      explore: ExploreReducer,
    })
  );

  return <Provider store={store}>{children}</Provider>;
}

export default AppProvider;
