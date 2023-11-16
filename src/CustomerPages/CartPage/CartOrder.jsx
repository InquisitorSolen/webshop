import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CartStripe from "./CartStripe";

export default function CartOrder() {
  const stripeTestPromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
  const cart = useSelector((state) => state.cartReducer);

  if (cart.cartProducts.length === 0) {
    return <Navigate to="*" />;
  }

  return (
    <Elements stripe={stripeTestPromise}>
      <CartStripe />
    </Elements>
  );
}
