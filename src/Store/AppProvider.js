import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { RootReducer } from "./RootReducer/RootReducer";
import { HomeReducer } from "./HomeReduce/HomeReduce";

function AppProvider({ children }) {
  const store = createStore(
    combineReducers({ root: RootReducer, home: HomeReducer })
  );

  return <Provider store={store}>{children}</Provider>;
}

export default AppProvider;
