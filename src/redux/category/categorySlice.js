import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryList: [],
  selectedCategory: {},
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});
export const { setCategoryList, setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
