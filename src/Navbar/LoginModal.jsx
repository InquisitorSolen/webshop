import { useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Modal from "react-modal";
import firebase from "../Utils/firebase";
import { modalStyle } from "../Utils/style";

export default function LoginModal({ setLoginModalOpen, loginModalOpen }) {
  const emailRef = useRef();
  const pwRef = useRef();

  const [loginErrorFlag, setLoginErrorFlag] = useState(false);
  const [resetPW, setResetPW] = useState(false);

  const closeModal = () => {
    setLoginErrorFlag(false);
    setLoginModalOpen(false);
    setResetPW(false);
  };

  const onResetPW = (e) => {
    e.preventDefault();
    firebase.auth().sendPasswordResetEmail(emailRef.current.value);
    setResetPW(false);
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
        <div className="flex flex-row justify-between mb-3 text-center">
          <div className="w-7"></div>
          {resetPW ? (
            <p className="text-center text-2xl font-bold">Elfelejtett jelszó</p>
          ) : (
            <p className="text-center text-2xl font-bold">Lépjen be Fiókjába</p>
          )}
          <button className="flex text-2xl text-danger" onClick={closeModal}>
            <IoIosClose />
          </button>
        </div>
        {resetPW ? (
          <form onSubmit={onResetPW} className="flex flex-col gap-6">
            <input
              type="email"
              ref={emailRef}
              placeholder="Email cím"
              required
              className="border-b w-96 pl-3 focus:outline-none"
            ></input>
            <div className="flex items-center justify-center">
              <button className="border border-primary hover:bg-primary hover:text-white rounded-xl py-1 px-2 font-bold">
                Küldés
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={onSignIn} className="flex flex-col gap-6">
            <input
              type="email"
              ref={emailRef}
              placeholder="Email cím"
              required
              className="border-b w-96 pl-3 focus:outline-none"
            ></input>
            <input
              type="password"
              ref={pwRef}
              placeholder="Jelszó"
              required
              className="border-b w-96 pl-3 focus:outline-none"
            ></input>
            <div className="flex items-center justify-center">
              <button className="border border-primary hover:bg-primary hover:text-white rounded-xl py-1 px-2 font-bold">
                Belépés
              </button>
            </div>
            {loginErrorFlag && (
              <p className="bg-danger text-center font-medium rounded-xl">
                Hibás email vagy jelszó!
              </p>
            )}
          </form>
        )}
        <div className="flex flex-row justify-center items-center text-center">
          {resetPW ? (
            <button
              className="text-sm underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              onClick={() => {
                setResetPW(false);
              }}
            >
              Bejelentkezés
            </button>
          ) : (
            <button
              className="text-sm underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              onClick={() => {
                setResetPW(true);
              }}
            >
              Elfelejtett jelszó
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
