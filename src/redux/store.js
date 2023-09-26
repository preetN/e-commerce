import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import adminReducer from "./user/userSlice";
import categoryReducer from "./category/categorySlice";
import systemReducer from "./systemState/systemSlice";
const reducers = combineReducers({
  admin: adminReducer,
  category: categoryReducer,
  system: systemReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({ reducer: persistedReducer });
