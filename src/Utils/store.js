import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";
import productCategoryReducer from "../Slices/productCaregorySlice";
import productReducer from "../Slices/productSlice";
import cartReducer from "../Slices/cartSlice";
import usersMapReducer from "../Slices/usersMapSlice";

const rootReducers = combineReducers({
  usersMapReducer,
  userReducer,
  productCategoryReducer,
  productReducer,
  cartReducer,
});

const store = configureStore({
  reducer: rootReducers,
});

export default store;
