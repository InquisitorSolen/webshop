import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";
import productCategoryReducer from "../Slices/productCaregorySlice";
import productReducer from "../Slices/productSlice";

const rootReducers = combineReducers({
  userReducer,
  productCategoryReducer,
  productReducer,
});

const store = configureStore({
  reducer: rootReducers,
});

export default store;
