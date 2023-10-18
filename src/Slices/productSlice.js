import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  productLoading: true,
};

export const productSlice = createSlice({
  name: "prodactItems",
  initialState,
  reducers: {
    getProduct(state, action) {
      state.product = action.payload.product;
      state.productLoading = false;
    },
  },
});

export const { getProduct } = productSlice.actions;
export default productSlice.reducer;
