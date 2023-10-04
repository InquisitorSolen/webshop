import { useRef } from "react";
import { Link } from "react-router-dom";
import firebase from "../../Utils/firebase";

export default function Header() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(emailRef, passwordRef)
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <header>
      <div className="flex flex-col items-end border-b py-2">
        <div>
          <form onSubmit={onSubmit} className="flex flex-row">
            <div className="flex flex-col ">
              <input
                ref={emailRef}
                placeholder="Email cím"
                className="border border-black rounded my-1 px-2"
              ></input>
              <input
                ref={passwordRef}
                placeholder="Jelszó"
                className="border border-black rounded my-1 px-2"
              ></input>
            </div>
            <button className="border border-black rounded mx-2 my-5 px-2">
              Belépés
            </button>
          </form>
          <p className="text-center">
            {"Nincs fiókod? "}
            <Link
              to="/signup"
              className="text-base underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              Regisztálj itt!
            </Link>
          </p>
        </div>
      </div>
    </header>
  );
}
