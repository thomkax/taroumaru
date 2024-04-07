import {
  Middleware,
  combineReducers,
  configureStore,
  isAction,
} from "@reduxjs/toolkit";
import {
  useDispatch as _useDispatch,
  useSelector as _useSelector,
  useStore as _useStore,
} from "react-redux";
import achsReducer, { filterAchs } from "./achs.slice";
import searchReducer, { setActiveCategory } from "./search.slice";
import miscReducer, { setCheckbox } from "./misc.slice";

// Filters achievements and resets last toggled checkbox is any
// of the values inside "search/" recuders are changed.
const searchMiddleware: Middleware<{}, RootState> =
  (storeAPI) => (next) => (action) => {
    const result = next(action);

    if (
      isAction(action) &&
      (action.type.startsWith("search/") || action.type === "achs/setProfile")
    ) {
      const state = storeAPI.getState();

      storeAPI.dispatch(
        filterAchs({
          misc: state.misc.value,
          search: state.search.value,
        }),
      );
      storeAPI.dispatch(setCheckbox(-1));

      // Extra check to prevent loops.
      // Changes active category based on the filtered achs.
      if (
        action.type !== "search/setCategory" &&
        action.type !== "search/setActiveCategory"
      ) {
        storeAPI.dispatch(
          setActiveCategory(storeAPI.getState().achs.value.filtered),
        );
      }
    }

    return result;
  };

// Moved to a seperate function to disable circle reference
// typescript error.
const reducers = combineReducers({
  achs: achsReducer,
  search: searchReducer,
  misc: miscReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // Disables serialization check because i18n function
        // is passed on misc reducer.
        serializableCheck: false,
      }).concat(searchMiddleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore["dispatch"];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = _useDispatch.withTypes<AppDispatch>();
export const useSelector = _useSelector.withTypes<RootState>();
export const useStore = _useStore.withTypes<AppStore>();
