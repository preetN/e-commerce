import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
};

export const userSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { setAdmin } = userSlice.actions;

export default userSlice.reducer;
