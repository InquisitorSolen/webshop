/* import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Auth/Auth";
import { useSelector } from "react-redux";
import { useContext, useState } from "react";
import firebase from "../../Utils/firebase";
import { loadStripe } from "@stripe/stripe-js";

export default function CartOrderStripe() {
  const user = useContext(AuthContext);
  const cart = useSelector((state) => state.cartReducer);

  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDay();
  const dateMontSlashes = [year, month].join("-");
  const dateDaySlashes = [year, month, day].join("-");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const docRef = await firebase
      .firestore()
      .collection("users")
      .doc(user.currentUser.uid)
      .collection("checkout_sessions")
      .add({
        mode: "payment",
        price: "price_1OD63UDnWpHcKHorZTsNN2cG", // One-time price created in Stripe
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(error.message);
      }
      if (sessionId) {
        const strip = await loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);
        strip.redirectToCheckout({ sessionId });
      }
    });
  };

  if (cart.cartProducts.length === 0) {
    return <Navigate to="*" />;
  }

  return <button onClick={handleSubmit}>push</button>;
}
 */
