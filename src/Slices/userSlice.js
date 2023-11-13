import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../Utils/firebase";

const initialState = {
  id: "",
  lvl: 0,
  email: "",
  familyName: "",
  surname: "",
  admin: false,
  addresses: [],
  userLoading: false,
};

export const updateAdmin = createAsyncThunk(
  "user/updateUserAdmin",
  async ({ id, data }, thunkAPI) => {
    const responseAdmin = await firebase
      .firestore()
      .collection("users")
      .doc("admins")
      .update({ [id]: data });

    thunkAPI.dispatch(getUserAsync(data.email));
    return responseAdmin;
  }
);

export const updateCustomer = createAsyncThunk(
  "user/updateUserCustomer",
  async ({ id, data }, thunkAPI) => {
    const responseCustomer = await firebase
      .firestore()
      .collection("users")
      .doc("customers")
      .update({ [id]: data });

    thunkAPI.dispatch(getUserAsync(data.email));
    return responseCustomer;
  }
);

export const getUserAsync = createAsyncThunk("user/getUser", async (email) => {
  const responseCustomer = await firebase
    .firestore()
    .collection("users")
    .doc("customers")
    .get();

  const responseAdmin = await firebase
    .firestore()
    .collection("users")
    .doc("admins")
    .get();

  const customer = Object.entries(responseCustomer.data()).find(
    (user) => user[1].email === email
  );
  const admin = Object.entries(responseAdmin.data()).find(
    (user) => user[1].email === email
  );

  if (customer === undefined) {
    return admin[1];
  } else {
    return customer[1];
  }
});

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
      state.addresses = action.payload.addresses;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAsync.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.familyName = action.payload.familyName;
      state.surname = action.payload.surname;
      state.lvl = action.payload.lvl;
      state.admin = action.payload.admin;
      state.addresses = action.payload.addresses;
      state.userLoading = false;
    });
    builder.addCase(getUserAsync.rejected, (state) => {
      state.userLoading = false;
    });

    builder.addCase(updateCustomer.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(updateCustomer.fulfilled, (state) => {
      state.userLoading = false;
    });
    builder.addCase(updateCustomer.rejected, (state) => {
      state.userLoading = false;
    });

    builder.addCase(updateAdmin.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(updateAdmin.fulfilled, (state) => {
      state.userLoading = false;
    });
    builder.addCase(updateAdmin.rejected, (state) => {
      state.userLoading = false;
    });
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
