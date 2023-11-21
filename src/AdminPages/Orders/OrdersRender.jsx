import { getOrders } from "../../Slices/ordersSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersTable from "./OrderTable";

export default function OrdersRender() {
  const orders = useSelector((state) => state.ordersReducer);
  const dispatch = useDispatch();

  const [selectedVal, setSelectedVal] = useState(orders.orderMonths[0]);

  useEffect(() => {
    if (selectedVal !== undefined) {
      dispatch(getOrders(selectedVal));
    }
  }, [dispatch, selectedVal]);

  return (
    <div className="grow">
      <div className="bg-slate-200 flex flex-col md:flex-row">
        <h1 className="text-2xl text-center md:text-start md:text-3xl font-bold md:ml-6 md:my-6">
          Rendelések az
        </h1>
        <select
          onChange={(event) => {
            setSelectedVal(event.target.value);
          }}
          value={selectedVal}
          className="bg-slate-200 focus:outline-none pl-1 text-center text-3xl font-bold"
        >
          {orders.orderMonths.map((month, key) => (
            <option key={key} value={month} className="text-base">
              {month}
            </option>
          ))}
        </select>
        <h1 className="text-start text-3xl font-bold my-6 pl-1">hónapban</h1>
      </div>
      <OrdersTable selectedVal={selectedVal} />
    </div>
  );
}
