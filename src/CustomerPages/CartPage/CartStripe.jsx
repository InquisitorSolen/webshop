import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import firebase from "../../Utils/firebase";

export default function CartStripe() {
  const cart = useSelector((state) => state.cartReducer);
  const stripe = useStripe();
  const elements = useElements();

  const [success, setSuccess] = useState(false);

  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDay();
  const dateMontSlashes = [year, month].join("-");
  const dateDaySlashes = [year, month, day].join("-");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await firebase
          .firestore()
          .collection("orders")
          .doc(dateMontSlashes)
          .update({
            [dateDaySlashes]: { amount: cart.cartPrice, stripeID: id },
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <CardElement></CardElement>
            </div>
          </fieldset>
          <button>Fizetés</button>
        </form>
      ) : (
        <p>{dateMontSlashes}</p>
      )}
    </>
  );
}
