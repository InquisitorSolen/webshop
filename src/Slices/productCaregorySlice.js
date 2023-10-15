import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  categoriesLoading: true,
};

export const productCaregorySlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {
    getCategories(state, action) {
      state.categories = action.payload.categories;
      state.categoriesLoading = action.payload.categoriesLoading;
    },
  },
});

export const { getCategories } = productCaregorySlice.actions;
export default productCaregorySlice.reducer;
