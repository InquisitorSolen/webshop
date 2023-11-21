import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../Utils/firebase";

const initialState = {
  cartProducts: [],
  cartPrice: 0,
  cartItemNumber: 0,
};

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDay();
const hours = date.getHours();
const minutes = date.getMinutes();
const sec = date.getSeconds();
const dateMontSlashes = [year, month].join("-");
const dateDaySlashes = [year, month, day].join("-");
const curretnHour = [hours, minutes, sec].join(":");
const currentMin = [year, month, day, curretnHour].join("-");

export const setPurchase = createAsyncThunk(
  "cart/setPurchase",
  async ({ user, data, contact }) => {
    console.log(user, data);

    let purchase = { ...data, date: dateDaySlashes, user: null };

    if (user !== null) {
      purchase = { ...purchase, user: user.id };
      const userData = {
        ...user,
        orders: { ...user.orders, [currentMin]: purchase },
      };
      await firebase
        .firestore()
        .collection("users")
        .doc(user.id)
        .update(userData);
    }
    purchase = { ...purchase, ...contact, orederState: 0 };
    const response = await firebase
      .firestore()
      .collection("orders")
      .doc(dateMontSlashes)
      .update({ [currentMin]: purchase });

    return response;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(setPurchase.pending, () => {});
    builder.addCase(setPurchase.fulfilled, () => {});
    builder.addCase(setPurchase.rejected, () => {});
  },
});

export const { getCart } = cartSlice.actions;
export default cartSlice.reducer;
