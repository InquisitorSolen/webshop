import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../Utils/firebase";

const initialState = {
  productCategories: {},
  productCategoriesNames: [],
  productCategoriesKeys: [],
  categoriesLoading: true,
};

export const getProductCategories = createAsyncThunk(
  "productCategories/getCategories",
  async () => {
    const response = await firebase
      .firestore()
      .collection("productCategories")
      .doc("categoryNames")
      .get();
    return response.data();
  }
);

export const productCaregorySlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductCategories.pending, (state) => {
      state.categoriesLoading = true;
    });
    builder.addCase(getProductCategories.fulfilled, (state, action) => {
      state.categoriesLoading = false;
      state.productCategories = action.payload;
      state.productCategoriesNames = Object.values(action.payload).sort();
      state.productCategoriesKeys = Object.keys(action.payload).sort();
    });
    builder.addCase(getProductCategories.rejected, (state) => {
      state.categoriesLoading = true;
    });
  },
});

export default productCaregorySlice.reducer;
