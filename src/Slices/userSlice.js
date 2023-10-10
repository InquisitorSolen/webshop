import { createSlice } from "@reduxjs/toolkit";

const initialState = { email: "", familyName: "", surname: "", lvl: 0 };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, action) {
      state.email = action.payload.email;
      state.familyName = action.payload.familyName;
      state.surname = action.payload.surname;
      state.lvl = action.payload.lvl;
    },
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
