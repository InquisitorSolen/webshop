import { updateOrder } from "../../Slices/ordersSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderDetailsModal from "./OrderDetailsModal";
import OrdersButton from "./OrdersButton";

export default function OrdersTable({ selectedVal }) {
  const orders = useSelector((state) => state.ordersReducer);
  const dispatch = useDispatch();

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const [ordersArrayChunked, setOrdersArrayChunked] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    if (orders.adminOrdersArray.length < 20) {
      setOrdersArrayChunked(orders.adminOrdersArray);
    } else {
      setOrdersArrayChunked(orders.adminOrdersArray.slice(0, 20));
    }
  }, [orders.adminOrdersArray]);

  const orderStateChangeHandler = ({ value, order }) => {
    const newOrderState = { ...order, orederState: value };

    dispatch(updateOrder({ orderMonth: selectedVal, data: newOrderState }));
  };

  const orderModalHandler = (order) => {
    setOrder(order);
    setOrderModalOpen(true);
  };

  return (
    <div className="flex flex-col m-6">
      <table className="border border-black table-fixed text-center bg-white">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="border-l border-black px-6">Rendelés időpontja</th>
            <th className="border-l border-black px-6">Rendelő neve</th>
            <th className="border-l border-black px-6">Rendelés ára</th>
            <th className="border-l border-black px-6">Rendelés állapota</th>
            <th className="border-l border-black px-6">Rendelés részletei</th>
          </tr>
        </thead>
        <tbody className="border-b border-black">
          {ordersArrayChunked.map((order, key) => {
            return (
              <tr key={key}>
                <td className="border border-black px-6 py-3">{order.date}</td>
                <td className="border border-black px-6 py-3">{order.name}</td>
                <td className="border border-black px-6 py-3">
                  {order.price} Huf
                </td>
                <td className="border border-black px-6 py-3">
                  <select
                    onChange={(event) => {
                      orderStateChangeHandler({
                        value: event.target.value,
                        order,
                      });
                    }}
                    value={order.orederState}
                    className="bg-white focus:outline-none"
                  >
                    <option value={0}>Megrendelve</option>
                    <option value={1}>Átadva futárnak</option>
                    <option value={2}>Kiszállítva</option>
                  </select>
                </td>
                <td className="border border-black px-6 py-3">
                  <button
                    className=" border border-primary px-2 bg-white text-center rounded-xl hover:bg-blue-400"
                    onClick={() => orderModalHandler(order)}
                  >
                    Részletek
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <OrdersButton
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setOrdersArrayChunked={setOrdersArrayChunked}
      />
      <OrderDetailsModal
        order={order}
        orderModalOpen={orderModalOpen}
        setOrderModalOpen={setOrderModalOpen}
      />
    </div>
  );
}
