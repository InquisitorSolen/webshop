import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../Utils/firebase";

const initialState = {
  productObj: {},
  productArray: [],
  productLoading: true,
};

export const getProductAsync = createAsyncThunk(
  "productItems/getProductThunk",
  async (categoryName) => {
    const response = await firebase
      .firestore()
      .collection("Products")
      .doc(categoryName)
      .get();
    return response.data();
  }
);

export const productSlice = createSlice({
  name: "productItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductAsync.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(getProductAsync.fulfilled, (state, action) => {
      state.productObj = action.payload;
      state.productArray = Object.values(action.payload);
      state.productLoading = false;
    });
    builder.addCase(getProductAsync.rejected, (state) => {
      state.productLoading = true;
    });
  },
});

export default productSlice.reducer;
