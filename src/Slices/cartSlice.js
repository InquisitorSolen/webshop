import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../Utils/firebase";
import { getUserAsync } from "./userSlice";

const initialState = {
  cartProducts: [],
  cartPrice: 0,
  cartItemNumber: 0,
};

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDay();
const hours = date.getHours();
const minutes = date.getMinutes();
const sec = date.getSeconds();
const dateMontSlashes = [year, month].join("-");
const dateDaySlashes = [year, month, day].join("-");
const curretnHour = [hours, minutes, sec].join(":");
const currentMin = [year, month, day, curretnHour].join("-");

export const setPurchase = createAsyncThunk(
  "cart/setPurchase",
  async ({ user, data, contact, payType }, thunkAPI) => {
    let purchase = { ...data, date: dateDaySlashes, user: null };

    if (user !== null) {
      purchase = { ...purchase, user: user.id };
      const userData = {
        ...user,
        orders: { ...user.orders, [currentMin]: purchase },
      };
      await firebase
        .firestore()
        .collection("users")
        .doc(user.id)
        .update(userData);
    }
    purchase = { ...purchase, ...contact, orederState: 0 };
    const response = await firebase
      .firestore()
      .collection("orders")
      .doc(dateMontSlashes)
      .set({ [currentMin]: purchase }, { merge: true });

    if (payType === "card") {
      firebase
        .firestore()
        .collection("mail")
        .add({
          to: [`${contact.email}`],
          message: {
            subject: "AlkIO rendelés",
            text: "",
            html: `<h2>Rendelését ${dateDaySlashes}-i dátummal fogadtuk ${
              contact.name
            } név alatt</h2> 
                    <h3>A rendelés várhatólag 7 napon belül kiszállításra kerül</h3>
                    <br/>
                    <b>Rendelés tartalma:</b> <br/>
                      ${data.cartProducts.map((item) => {
                        return `${item.name}  ${item.quantity} db <br>`;
                      })}
                    <br/>
                    <b>A rendelés összege:</b> ${data.price} Ft
                    <br/>
                    <b>Fizetés módja:</b> bankkártyával fizetve
                    <br/>
                    <br/>
                    Rendelését ezuton is köszönjük! 
                    <br/>
                    AlkIO csapat
                  `,
          },
        });
    } else {
      firebase
        .firestore()
        .collection("mail")
        .add({
          to: [`${contact.email}`],
          message: {
            subject: "AlkIO rendelés",
            text: "",
            html: `<h2>Rendelését ${dateDaySlashes}-i dátummal fogadtuk ${
              contact.name
            } név alatt</h2> 
                    <h3>A rendelés várhatólag 7 napon belül kiszállításra kerül</h3>
                    <br/>
                    <b>Rendelés tartalma:</b> <br/>
                      ${data.cartProducts.map((item) => {
                        return `${item.name}  ${item.quantity} db <br>`;
                      })}
                    <br/>
                    <b>A rendelés összege:</b> ${data.price} Ft
                    <br/>
                    <b>Fizetés módja:</b> kézpénzzel kiszállításkor
                    <br/>
                    <br/>
                    Rendelését ezuton is köszönjük! 
                    <br/>
                    AlkIO csapat
                  `,
          },
        });
    }
    if (user !== null) {
      thunkAPI.dispatch(getUserAsync(user.uid));
    }
    return response;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart(state, action) {
      state.cartProducts = action.payload.cartProducts;
      state.cartPrice = action.payload.cartPrice;
      state.cartItemNumber = action.payload.cartItemNumber;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setPurchase.pending, () => {});
    builder.addCase(setPurchase.fulfilled, () => {});
    builder.addCase(setPurchase.rejected, () => {});
  },
});

export const { getCart } = cartSlice.actions;
export default cartSlice.reducer;
