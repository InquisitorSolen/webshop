import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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

    const stripePromise = loadStripe();
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
