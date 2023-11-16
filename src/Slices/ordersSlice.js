import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../Utils/firebase";

const initialState = {
  adminOrders: [],
  adminOrdersLoading: false,
};

export const getOrders = createAsyncThunk(
  "productItems/getProduct",
  async (categoryName) => {
    const response = await firebase
      .firestore()
      .collection("Products")
      .doc(categoryName)
      .get();
    return response.data();
  }
);

export const ordersSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default ordersSlice.reducer;
