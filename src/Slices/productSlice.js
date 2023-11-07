import { compare } from "../Utils/utilFunctions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../Utils/firebase";

const initialState = {
  productObj: {},
  productArray: [],
  productLoading: true,
};

export const getProduct = createAsyncThunk(
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

export const deleteProduct = createAsyncThunk(
  "productItems/deleteProduct",
  async ({ categoryName, product }, thunkAPI) => {
    const response = await firebase
      .firestore()
      .collection("Products")
      .doc(categoryName)
      .update({ [product]: firebase.firestore.FieldValue.delete() });
    thunkAPI.dispatch(getProduct(categoryName));
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "productItems/updateProduct",
  async ({ categoryName, product, data }, thunkAPI) => {
    const response = await firebase
      .firestore()
      .collection("Products")
      .doc(categoryName)
      .update({ [product]: data });
    thunkAPI.dispatch(getProduct(categoryName));
    return response;
  }
);

export const productSlice = createSlice({
  name: "productItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.productObj = action.payload;
      state.productArray = Object.values(action.payload).sort(compare);
      state.productLoading = false;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.productLoading = true;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.productLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.productLoading = true;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.productLoading = false;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.productLoading = true;
    });
  },
});

export default productSlice.reducer;
