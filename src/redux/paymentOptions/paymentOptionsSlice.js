import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentList: [],
  selectedPayment: {},
};
const paymentSlice = createSlice({
  name: "paymentOption",
  initialState,
  reducers: {
    setPaymentOptionList: (state, action) => {
      state.paymentList = action.payload;
    },
    setSelectedPaymentOption: (state, action) => {
      state.selectedPayment = action.payload;
    },
  },
});

const { actions, reducer } = paymentSlice;

export const { setPaymentOptionList, setSelectedPaymentOption } = actions;
export default reducer;
