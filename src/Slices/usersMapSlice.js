import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../Utils/firebase";
import { compareUser } from "../Utils/utilFunctions";

const initialState = {
  adminUsersObj: {},
  adminUsers: [],
  customerUsersObj: {},
  customerUsers: [],
  usersMapLoading: false,
};

export const updateMapAdmin = createAsyncThunk(
  "usersMap/updateUserAdmin",
  async ({ id, data }, thunkAPI) => {
    const responseAdmin = await firebase
      .firestore()
      .collection("users")
      .doc("admins")
      .update({ [id]: data });

    thunkAPI.dispatch(getAdminUsers());
    return responseAdmin;
  }
);

export const updateMapCustomer = createAsyncThunk(
  "usersMap/updateUserCustomer",
  async ({ id, data }, thunkAPI) => {
    const responseCustomer = await firebase
      .firestore()
      .collection("users")
      .doc("customers")
      .update({ [id]: data });

    thunkAPI.dispatch(getCustomerUsers());
    return responseCustomer;
  }
);

export const getAdminUsers = createAsyncThunk("usersMap/Admins", async () => {
  const responseAdmin = await firebase
    .firestore()
    .collection("users")
    .doc("admins")
    .get();
  return responseAdmin.data();
});

export const getCustomerUsers = createAsyncThunk(
  "usersMap/Customers",
  async () => {
    const responseCustomer = await firebase
      .firestore()
      .collection("users")
      .doc("customers")
      .get();

    return responseCustomer.data();
  }
);

export const moveToAdmin = createAsyncThunk(
  "usersMap/moveCustomerToAdmin",
  async ({ id, data }, thunkAPI) => {
    await firebase
      .firestore()
      .collection("users")
      .doc("customers")
      .update({ [id]: firebase.firestore.FieldValue.delete() });

    const response = await firebase
      .firestore()
      .collection("users")
      .doc("admins")
      .update({ [id]: data });

    thunkAPI.dispatch(getAdminUsers());
    thunkAPI.dispatch(getCustomerUsers());
    return response;
  }
);

export const moveToCustomer = createAsyncThunk(
  "usersMap/moveAdminToCustomer",
  async ({ id, data }, thunkAPI) => {
    await firebase
      .firestore()
      .collection("users")
      .doc("customers")
      .update({ [id]: data });

    const response = await firebase
      .firestore()
      .collection("users")
      .doc("admins")
      .update({ [id]: firebase.firestore.FieldValue.delete() });

    thunkAPI.dispatch(getAdminUsers());
    thunkAPI.dispatch(getCustomerUsers());
    return response;
  }
);

export const usersMapSlice = createSlice({
  name: "usersMap",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(moveToCustomer.pending, (state) => {
      state.usersMapLoading = true;
    });
    builder.addCase(moveToCustomer.fulfilled, (state) => {
      state.usersMapLoading = false;
    });
    builder.addCase(moveToCustomer.rejected, (state) => {
      state.usersMapLoading = false;
    });

    builder.addCase(moveToAdmin.pending, (state) => {
      state.usersMapLoading = true;
    });
    builder.addCase(moveToAdmin.fulfilled, (state) => {
      state.usersMapLoading = false;
    });
    builder.addCase(moveToAdmin.rejected, (state) => {
      state.usersMapLoading = false;
    });

    builder.addCase(getAdminUsers.pending, (state) => {
      state.usersMapLoading = true;
    });
    builder.addCase(getAdminUsers.fulfilled, (state, action) => {
      state.adminUsersObj = action.payload;
      state.adminUsers = Object.values(action.payload).sort(compareUser);
      state.usersMapLoading = false;
    });
    builder.addCase(getAdminUsers.rejected, (state) => {
      state.usersMapLoading = false;
    });

    builder.addCase(getCustomerUsers.pending, (state) => {
      state.usersMapLoading = true;
    });
    builder.addCase(getCustomerUsers.fulfilled, (state, action) => {
      state.customerUsersObj = action.payload;
      state.customerUsers = Object.values(action.payload).sort(compareUser);
      state.usersMapLoading = false;
    });
    builder.addCase(getCustomerUsers.rejected, (state) => {
      state.usersMapLoading = false;
    });

    builder.addCase(updateMapAdmin.pending, (state) => {
      state.usersMapLoading = true;
    });
    builder.addCase(updateMapAdmin.fulfilled, (state) => {
      state.usersMapLoading = false;
    });
    builder.addCase(updateMapAdmin.rejected, (state) => {
      state.usersMapLoading = false;
    });

    builder.addCase(updateMapCustomer.pending, (state) => {
      state.usersMapLoading = true;
    });
    builder.addCase(updateMapCustomer.fulfilled, (state) => {
      state.usersMapLoading = false;
    });
    builder.addCase(updateMapCustomer.rejected, (state) => {
      state.usersMapLoading = false;
    });
  },
});

export default usersMapSlice.reducer;
