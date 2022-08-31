import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const middleWares = [logger];

const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

export const persistedReduser = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReduser,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
