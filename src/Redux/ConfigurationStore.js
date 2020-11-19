import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import logger from "redux-logger";
import admin from "./Reducers/adminReducer";

const rootReducer = combineReducers({
  admin,
});

const persistConfig = {
  key: "root",
  storage,
};

const middleware = applyMiddleware(thunk, logger);

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, middleware);
let persistor = persistStore(store);
export { store, persistor };
