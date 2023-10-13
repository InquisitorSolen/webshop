import Modal from "react-modal";
import modalStyle from "../Utils/modalStyle";
import { AuthContext } from "../Auth/Auth";
import { useContext, useRef } from "react";

export default function LoginModal({ setLoginModalOpen, loginModalOpen }) {
  const { login } = useContext(AuthContext);
  const emailRef = useRef();
  const pwRef = useRef();

  const closeModal = () => {
    setLoginModalOpen(false);
  };

  const onSignIn = (event) => {
    event.preventDefault();
    try {
      login(emailRef.current.value, pwRef.current.value);
      closeModal();
    } catch (error) {
      console.error("login error");
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={loginModalOpen}
      style={modalStyle}
      onRequestClose={closeModal}
      ariaHideApp={false}
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
      </div>
    </Modal>
  );
}
