import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";
import productCategoryReducer from "../Slices/productCaregorySlice";

const rootReducers = combineReducers({ userReducer, productCategoryReducer });

const store = configureStore({
  reducer: rootReducers,
});

export default store;
