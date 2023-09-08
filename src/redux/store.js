import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./user/userSlice";
export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});
