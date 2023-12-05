import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { cardStyle, modalStyle } from "../../Utils/style";
import Modal from "react-modal";
import "./CartStripeModal.css";
import { numberWithSpaces } from "../../Utils/utilFunctions";

export default function CartStripeModal({ openModal, setOpenModal }) {
  const cart = useSelector((state) => state.cartReducer);
  const closeModal = () => {
    setOpenModal(false);
  };

  const stripe = useStripe();
  const elements = useElements();

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    //Creates a PaymentMethod object from the collected data
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        // this should be passed to backend
        const response = {
          amount:
            parseInt(Math.round(cart.cartPrice - cart.cartPrice * 0.15) / 5) *
            5,
          id,
        };

        if (response.data.success) {
          console.log("payment success");
          setPaymentSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log("CreatePaymentError", error.message);
    }
  };

  return (
    <Modal
      isOpen={openModal}
      style={modalStyle}
      ariaHideApp={false}
      onRequestClose={closeModal}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between text-center">
          <div className="w-7" />
          {paymentSuccess ? (
            <h1 className="text-center text-2xl font-bold">Sikeres fizetés</h1>
          ) : (
            <h1 className="text-center text-2xl font-bold">
              Bankkártyás fizetés
            </h1>
          )}
          <button className="flex text-2xl text-danger" onClick={closeModal}>
            <IoIosClose />
          </button>
        </div>
        <div className="flex flex-row justify-between border-b py-3 my-3">
          <p className="font-bold">Fizetendő összeg:</p>
          <p className="font-bold">
            {numberWithSpaces(
              parseInt(Math.round(cart.cartPrice - cart.cartPrice * 0.15) / 5) *
                5
            )}{" "}
            Ft
          </p>
        </div>
        {!paymentSuccess && (
          <form
            onSubmit={handleSubmit}
            className="w-[36rem] flex flex-col items-center"
          >
            <fieldset className="FormGroup w-full">
              <div className="FormRow">
                <CardElement options={cardStyle} />
              </div>
            </fieldset>
            <button className="border border-primary rounded-2xl py-1 px-2 font-bold w-fit bg-white hover:bg-primary hover:text-white mt-3">
              Fizetés
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
