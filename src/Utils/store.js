import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";

const rootReducers = combineReducers({ userReducer });

const store = configureStore({
  reducer: rootReducers,
});

export default store;
