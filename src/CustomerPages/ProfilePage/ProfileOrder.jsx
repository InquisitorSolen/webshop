import { useSelector } from "react-redux";
import { numberWithSpaces } from "../../Utils/utilFunctions";
import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export default function ProfileOrder() {
  const user = useSelector((state) => state.userReducer);

  const localOrders = Object.values(user.orders);

  const [showData, setShowData] = useState("");

  return (
    <div className="flex flex-col grow items-centere m-6">
      {localOrders.map((order, key) => {
        return (
          <div className="border flex flex-col p-6 m-3" key={key}>
            <div className="flex flex-row mb-3 text-center justify-between">
              <button
                className="flex felx-row items-center"
                onClick={() => {
                  if (showData === key) {
                    setShowData("");
                  } else {
                    setShowData(key);
                  }
                }}
              >
                <h1 className="font-bold text-lg mr-6">{order.date}</h1>
                <h2 className="text-lg">{order.address}</h2>
                {showData === key ? <BsChevronUp /> : <BsChevronDown />}
              </button>
              <h1 className="text-lg font-bold">
                {numberWithSpaces(order.price)} Ft
              </h1>
            </div>
            {showData === key && (
              <div className="flex flex-col">
                {order.cartProducts.map((product) => {
                  return (
                    <div
                      key={product.name}
                      className="flex flex-row mb-3 border p-2 justify-between"
                    >
                      <h1 className="font-bold">{product.name}:</h1>
                      <p>{product.quantity} db</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
