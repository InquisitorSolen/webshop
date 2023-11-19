import { asciify } from "../Utils/regexChecks";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../Utils/firebase";

const initialState = {
  productCategories: {},
  productCategoriesNames: [],
  productCategoriesKeys: [],
  categoriesLoading: true,
};

export const getProductCategories = createAsyncThunk(
  "productCategories/getProductCategories",
  async () => {
    const response = await firebase
      .firestore()
      .collection("productCategories")
      .doc("categoryNames")
      .get();
    return response.data();
  }
);

export const deleteProductCategory = createAsyncThunk(
  "productCategories/deleteProductCategories",
  async (categoryName, thunkAPI) => {
    await firebase
      .firestore()
      .collection("productCategories")
      .doc("categoryNames")
      .update({ [categoryName]: firebase.firestore.FieldValue.delete() });

    const response = await firebase
      .firestore()
      .collection("Products")
      .doc(categoryName)
      .delete();

    thunkAPI.dispatch(getProductCategories());

    return response;
  }
);

export const editProductCategory = createAsyncThunk(
  "productCategories/editProductCategories",
  async ({ categoryName, oldCategoryName }, thunkAPI) => {
    const oldCategoryAsciiName = asciify(oldCategoryName);
    const categoryAsciiName = asciify(categoryName);

    const data = await firebase
      .firestore()
      .collection("Products")
      .doc(oldCategoryAsciiName)
      .get();

    await firebase
      .firestore()
      .collection("productCategories")
      .doc("categoryNames")
      .update({
        [oldCategoryAsciiName]: firebase.firestore.FieldValue.delete(),
        [categoryAsciiName]: categoryName,
      });

    await firebase
      .firestore()
      .collection("Products")
      .doc(oldCategoryAsciiName)
      .delete();

    const response = await firebase
      .firestore()
      .collection("Products")
      .doc(categoryAsciiName)
      .set(data.data());

    thunkAPI.dispatch(getProductCategories());

    return response;
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

    builder.addCase(deleteProductCategory.pending, (state) => {
      state.categoriesLoading = true;
    });
    builder.addCase(deleteProductCategory.fulfilled, (state) => {
      state.categoriesLoading = false;
    });
    builder.addCase(deleteProductCategory.rejected, (state) => {
      state.categoriesLoading = true;
    });

    builder.addCase(editProductCategory.pending, (state) => {
      state.categoriesLoading = true;
    });
    builder.addCase(editProductCategory.fulfilled, (state) => {
      state.categoriesLoading = false;
    });
    builder.addCase(editProductCategory.rejected, (state) => {
      state.categoriesLoading = true;
    });
  },
});

export default productCaregorySlice.reducer;
