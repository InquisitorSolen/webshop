import { useRef, useState } from "react";
import Modal from "react-modal";
import firebase from "../Utils/firebase";
import modalStyle from "../Utils/modalStyle";

export default function LoginModal({ setLoginModalOpen, loginModalOpen }) {
  const emailRef = useRef();
  const pwRef = useRef();

  const [loginErrorFlag, setLoginErrorFlag] = useState(false);

  const closeModal = () => {
    setLoginErrorFlag(false);
    setLoginModalOpen(false);
  };

  const onSignIn = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(emailRef.current.value, pwRef.current.value)
      .then((res) => {
        if (res) {
          closeModal();
        }
      })
      .catch((err) => {
        setLoginErrorFlag(true);
        console.error(err);
      });
  };

  return (
    <Modal
      isOpen={loginModalOpen}
      style={modalStyle}
      ariaHideApp={false}
      onRequestClose={closeModal}
    >
      <div className="flex flex-col gap-4">
        <p className="text-center font-medium">Lépjen be Fiókjába</p>
        <form onSubmit={onSignIn} className="flex flex-col gap-3">
          <input
            type="email"
            ref={emailRef}
            placeholder="Email cím"
            required
            className="border border-black rounded my-1 px-2"
          ></input>
          <input
            type="password"
            ref={pwRef}
            placeholder="Jelszó"
            required
            className="border border-black rounded my-1 px-2"
          ></input>
          <div className="flex items-center justify-center">
            <button className="border border-black rounded-xl mx-2  px-2">
              Belépés
            </button>
          </div>
        </form>
        {loginErrorFlag && (
          <p className="bg-danger text-center font-medium rounded-xl">
            Hibás email vagy jelszó!
          </p>
        )}
      </div>
    </Modal>
  );
}
