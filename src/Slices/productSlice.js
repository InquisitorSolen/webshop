import { compare, compareNewProducts } from "../Utils/utilFunctions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../Utils/firebase";

const initialState = {
  productObj: {},
  productArray: [],
  productLoading: false,
  newProductsArray: [],
  newProductsObj: {},
  newProductLoading: false,
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

export const getNewProduct = createAsyncThunk(
  "productItems/getNewProduct",
  async () => {
    const response = await firebase
      .firestore()
      .collection("newProducts")
      .doc("product")
      .get();

    console.log(response.data());
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
    thunkAPI.dispatch(deleteNewProduct({ id: product }));
    return response;
  }
);

export const deleteNewProduct = createAsyncThunk(
  "productItems/deleteNewProduct",
  async ({ id }, thunkAPI) => {
    const response = await firebase
      .firestore()
      .collection("newProducts")
      .doc("product")
      .update({ [id]: firebase.firestore.FieldValue.delete() });
    thunkAPI.dispatch(getNewProduct());
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

export const updateNewProduct = createAsyncThunk(
  "productItems/updateNewProduct",
  async ({ id, product }, thunkAPI) => {
    const response = await firebase
      .firestore()
      .collection("newProducts")
      .doc("product")
      .update({ [id]: product });
    thunkAPI.dispatch(getNewProduct());
    return response;
  }
);

export const productSlice = createSlice({
  name: "productItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewProduct.pending, (state) => {
      state.newProductLoading = true;
    });
    builder.addCase(getNewProduct.fulfilled, (state, action) => {
      console.log(action.payload);
      state.newProductsObj = action.payload;
      state.newProductsArray = Object.values(action.payload).sort(
        compareNewProducts
      );
      state.newProductLoading = false;
    });
    builder.addCase(getNewProduct.rejected, (state) => {
      state.newProductLoading = false;
    });

    builder.addCase(getProduct.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.productObj = action.payload;
      state.productArray = Object.values(action.payload).sort(compare);
      state.productLoading = false;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.productLoading = false;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.productLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.productLoading = false;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.productLoading = false;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.productLoading = false;
    });

    builder.addCase(updateNewProduct.pending, (state) => {
      state.newProductLoading = true;
    });
    builder.addCase(updateNewProduct.fulfilled, (state) => {
      state.newProductLoading = false;
    });
    builder.addCase(updateNewProduct.rejected, (state) => {
      state.newProductLoading = false;
    });
  },
});

export default productSlice.reducer;
