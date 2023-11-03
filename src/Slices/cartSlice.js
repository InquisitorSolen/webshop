import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  cartPrice: 0,
  cartItemNumber: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart(state, action) {
      state.cartProducts = action.payload.cartProducts;
      state.cartPrice = action.payload.cartPrice;
      state.cartItemNumber = action.payload.cartItemNumber;
    },
  },
});

export const { getCart } = cartSlice.actions;
export default cartSlice.reducer;
