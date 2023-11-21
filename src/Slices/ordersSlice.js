import { getDocs } from "firebase/firestore";
import { compareOrders } from "../Utils/utilFunctions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../Utils/firebase";

const initialState = {
  orderMonths: [],
  adminMonthsLoading: false,
  adminOrdersObj: {},
  adminOrdersArray: [],
  adminOrdersLoading: false,
};

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ orderMonth, data }, thunkAPI) => {
    const updatedData = { ...data };
    delete updatedData.orderID;

    const response = await firebase
      .firestore()
      .collection("orders")
      .doc(orderMonth)
      .update({ [data.orderID]: updatedData });

    if (data.orederState === "1") {
      firebase
        .firestore()
        .collection("mail")
        .add({
          to: [`${data.email}`],
          message: {
            subject: "Rendelés átadása futárnak",
            text: "",
            html: `<h2>Tisztelt ${data.name}!</h2>
                    <h3>${
                      data.date
                    }-i rendelését mai napon átadtuk futárunknak kézbesítésre</h3>
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
    thunkAPI.dispatch(getOrders(orderMonth));
    return response;
  }
);

export const getOrderMonths = createAsyncThunk(
  "orders/getOrderMonths",
  async () => {
    const orders = [];
    await getDocs(firebase.firestore().collection("orders")).then(
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          orders.push(doc.id);
        });
      }
    );
    return orders;
  }
);

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (orderMonth) => {
    const response = await firebase
      .firestore()
      .collection("orders")
      .doc(orderMonth)
      .get();
    return response.data();
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.adminOrdersLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.adminOrdersObj = action.payload;
      state.adminOrdersArray = Object.entries(action.payload)
        .sort(compareOrders)
        .map((order) => {
          const data = { ...order[1], orderID: order[0] };
          return data;
        });
      state.adminOrdersLoading = false;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.adminOrdersLoading = false;
    });

    builder.addCase(getOrderMonths.pending, (state) => {
      state.adminMonthsLoading = true;
    });
    builder.addCase(getOrderMonths.fulfilled, (state, action) => {
      state.orderMonths = action.payload;
      state.adminMonthsLoading = false;
    });
    builder.addCase(getOrderMonths.rejected, (state) => {
      state.adminMonthsLoading = false;
    });

    builder.addCase(updateOrder.pending, (state) => {
      state.adminOrdersLoading = true;
    });
    builder.addCase(updateOrder.fulfilled, (state) => {
      state.adminOrdersLoading = false;
    });
    builder.addCase(updateOrder.rejected, (state) => {
      state.adminOrdersLoading = false;
    });
  },
});

export default ordersSlice.reducer;
