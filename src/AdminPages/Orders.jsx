import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderMonths } from "../Slices/ordersSlice";
import Loader from "../UtilPages/Loader";
import OrdersRender from "./Orders/OrdersRender";

export default function Orders() {
  const userdata = useSelector((state) => state.userReducer);
  const orders = useSelector((state) => state.ordersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderMonths());
  }, [dispatch]);

  if (!userdata.admin) {
    return <Navigate to="*" />;
  }

  if (orders.adminMonthsLoading) {
    return <Loader />;
  }

  return <OrdersRender />;
}
