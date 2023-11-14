import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function CartOrder() {
  const cart = useSelector((state) => state.cartReducer);

  if (cart.cartProducts.length === 0) {
    return <Navigate to="*" />;
  }

  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const withSlashes = [year, month].join("-");
  console.log(withSlashes);
}
