import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";
import productCategoryReducer from "../Slices/productCaregorySlice";
import productReducer from "../Slices/productSlice";
import cartReducer from "../Slices/cartSlice";

const rootReducers = combineReducers({
  userReducer,
  productCategoryReducer,
  productReducer,
  cartReducer,
});

const store = configureStore({
  reducer: rootReducers,
});

export default store;
