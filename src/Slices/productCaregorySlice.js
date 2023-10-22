import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoriesNames: [],
  categories: [],
  categoriesLoading: true,
  ProductCategories: {},
};

export const productCaregorySlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {
    getCategories(state, action) {
      state.categories = action.payload.categories;
      state.categoriesLoading = action.payload.categoriesLoading;
      state.categoriesNames = action.payload.categoriesNames;
      state.ProductCategories = action.payload.ProductCategories;
    },
  },
});

export const { getCategories } = productCaregorySlice.actions;
export default productCaregorySlice.reducer;
