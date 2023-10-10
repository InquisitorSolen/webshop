import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lvl: 0,
  admin: false,
  userLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, action) {
      state.userLoading = action.payload.userLoading;
      state.email = action.payload.email;
      state.familyName = action.payload.familyName;
      state.surname = action.payload.surname;
      state.lvl = action.payload.lvl;
      state.admin = action.payload.admin;
    },
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
